import { useState, useCallback, useEffect, useMemo, useContext, } from "react";
import { createFetchAllAction, createToggleDoneItemAction, createUpdateItemAction } from "context/actions/item.action.creator";
import TodoListType from "enums/todo-list-type.enum";
import UpdateTodo from "models/update-todo";
import todoService from "service/todo.service";
import { createRemoveItemsAction, createClearWaitingList } from '../../context/actions/item.action.creator';
import AppCtx from "context/app-context";
import sessionStorageManager from 'utilities/session-storage-manager.utility'
import ReadTodo from "models/read-todo";
import dateConverterUtility from 'utilities/date-converter.utility';

// FIXME: task update issue.

const useTodoList = (listDate: Date
) => {

  // #region ANCHOR Context
  const ctx = useContext(AppCtx);
  const { inCompTodos, compTodos, updateWaitingList } = ctx.state;
  const dispatch = ctx.dispatch;
  // #endregion context  

  // #region ANCHOR States
  const [checkedItemIds, setCheckedItemIds] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listType, setListType] = useState(TodoListType.Incompleted);
  const [renderAll, setRenderAll] = useState(true);

  // #endregion states

  // #region ANCHOR Memo

  /*  Generate key by listDate. */
  const sessionKey = useMemo(() => {
    return `${listDate.toLocaleDateString()}`;
  }, [listDate]);

  // #endregion Memo

  // #region ANCHOR Effects 

  useEffect(() => {
    setRenderAll(true);
  }, [listType]);

  useEffect(() => {
    setRenderAll(false);
  }, [inCompTodos.length, compTodos.length]);

  /** Loads todos by:
   *  - if session storage has data, then receive session storage data.
   *  - if not then call service to get data from the server.
   */
  const loadTodoEffect = () => {

    /**
     * Calls api to retrieve compTodos and inCompTodos, then dispatches it into context.
     */
    const fetchTodos = async () => {
      let inCompTodos: ReadTodo[], compTodos: ReadTodo[];

      setIsLoading(true);

      // data is in session storage.
      if (sessionStorageManager.isInStorage(sessionKey)) {

        const todos = await sessionStorageManager.retrieveData(sessionKey);


        inCompTodos = dateConverterUtility.convertTodosDate(todos.inCompTodos)
        compTodos = dateConverterUtility.convertTodosDate(todos.compTodos)
      }
      // data is not in session storage.
      else {

        console.log('data is not in session storage.')
        compTodos = await todoService.getTodos({ listType: TodoListType.Completed, date: listDate });

        inCompTodos = await todoService.getTodos({ listType: TodoListType.Incompleted, date: listDate })

      }

      dispatch(createFetchAllAction(inCompTodos, compTodos, listType))

      setIsLoading(false);

    }

    fetchTodos();
  }
  /** Updates unloadCallback fn with current updateWaitingList. 
   * @returns 
   *  function fetchData() :void {
      setIsLoading(true);
      helper.fetchTodos(dispatch, listType, listDate);
      setIsLoading(false);
    }
     */
  const listDateChangedEffect = useCallback(() => {
    sessionStorageManager.updateStorage({ inCompTodos, compTodos }, sessionKey);

  }, [listDate, inCompTodos, compTodos])

  const updateUnloadCallbackEffect = useCallback(() => {

    /**
     * function that will be called on when event 'beforeunload' triggered.
     * @returns event.returnValue = "Are you sure you want to exit?"
     * */
    async function beforeunloadCallback(event: any) {

      //update todos in the db with updateWaitingList.
      await todoService.updateMultipleTodos(updateWaitingList)

      console.log(`Before refresh: \n inCompTodos: ${inCompTodos}\n compTodos: ${compTodos}`)

      // clear waiting list.
      dispatch(createClearWaitingList());

      return event.returnValue = "Are you sure you want to exit?";
    }


    // FIXME The amount of callback registered on 'beforeunload' is equal to amount of updates. Which causes to call beforeunloadCallback function multiple times.

    // update session storage.
    sessionStorageManager.updateStorage({ inCompTodos, compTodos }, sessionKey);

    console.log('a');
    window.removeEventListener('beforeunload', beforeunloadCallback, true)
    window.addEventListener('beforeunload', beforeunloadCallback, true)

  }, [updateWaitingList.length])


  useEffect(loadTodoEffect, [listDate, sessionKey]);

  useEffect(listDateChangedEffect, [listDate, sessionKey, inCompTodos, compTodos]);

  useEffect(updateUnloadCallbackEffect, [updateWaitingList.length]);

  // #endregion useEffect

  // #region ANCHOR Handlers

  /* CheckBox */
  const handleAllCheckToggle = useCallback(() => {
    // remove all check
    if (checkedItemIds.length > 0) {
      setCheckedItemIds([]);
      setAllChecked(false);
    } else {
      // check all
      setCheckedItemIds((checkedIds) => {
        const newCheckedIds: string[] = [];

        let todos =
          listType === TodoListType.Incompleted ? inCompTodos : compTodos;

        for (var todo of todos) {
          newCheckedIds.push(todo.id);
        }

        return newCheckedIds;
      });
      setAllChecked((prev) => !prev);
    }
  }, [checkedItemIds.length, compTodos, inCompTodos, listType]);

  const handleCheckToggle = (todoId: string) => {
    // when removing check
    if (checkedItemIds.includes(todoId)) {
      setCheckedItemIds((prev) => {
        let newState = [...prev];
        newState = newState.filter((itemId: string) => {
          return itemId !== todoId;
        });
        return newState;
      });
    }
    // when checking
    else {
      setCheckedItemIds((prev) => [...prev, todoId]);
    }
  };

  /* ListType toggle */
  const handleListTypeToggle = () => {
    if (listType === TodoListType.Incompleted)
      setListType(TodoListType.Completed);
    else setListType(TodoListType.Incompleted);

  };

  const handleRemove = async (event: Event) => {
    event.preventDefault();

    // when there is nothing to remove.
    if (checkedItemIds.length === 0) {
      return;
    }

    setIsLoading(true)
    dispatch(createRemoveItemsAction(checkedItemIds, listType))
    await todoService.deleteMultipleTodos(checkedItemIds);
    // empty out checkedItemIds.
    setCheckedItemIds([]);
    // loading
    setIsLoading(false);
    // refresh allChecked.
    setAllChecked(false);
  };

  const handleDone = async () => {
    // create a array of updateTodos from checkedItemId array.
    for (var checkedItemId of checkedItemIds) {
      const updateTodo: UpdateTodo = new UpdateTodo(checkedItemId, {
        // the completed status depends on the type of the list currently on.
        // if current list is completed list and user clicks undone, then here should set item.completed = false.
        completed: listType === TodoListType.Completed ? false : true,
      });
      dispatch(createToggleDoneItemAction(updateTodo, listType))
    }
  };

  const handleUpdate = (updateTodo: UpdateTodo) => {
    // TODO update context.state.updateWaitingList
    dispatch(createUpdateItemAction(updateTodo, listType));
  };



  // #endregion handlers

  return {
    inCompTodos,
    compTodos,
    listType,
    isLoading,
    allChecked,
    checkedItemIds,
    renderAll,

    handleDone,
    handleRemove,
    handleAllCheckToggle,
    handleCheckToggle,
    handleListTypeToggle,
    handleUpdate,
  };
};

export default useTodoList;
