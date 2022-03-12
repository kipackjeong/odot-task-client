import { useState, useCallback, useEffect, useMemo, useContext, } from "react";
import { createFetchAllAction, createToggleDoneItemAction, createUpdateItemAction } from "context/actions/item.action.creator";
import TodoListType from "enums/todo-list-type.enum";
import UpdateTodo from "models/update-todo";
import todoService from "service/todo.service";
import { createRemoveItemsAction } from '../../context/actions/item.action.creator';
import AppCtx from "context/app-context";
import sessionStorageManager from 'utilities/session-storage-manager.utility'
import ReadTodo from "models/read-todo";
import dateConverterUtility from 'utilities/date-converter.utility';


const useTodoList = (listDate: Date
) => {

  // #region ANCHOR Context
  const ctx = useContext(AppCtx);
  const { inCompTodos, compTodos } = ctx.state;
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

  /** Whenever the list type changes (incompleted list <-> completed list), 
   * set to render all list items.
   * This is needed for the rendering animation time adjustment per situation. 
   */

  useEffect(() => {
    setRenderAll(true);
  }, [listType]);

  /** Whenever the list length changes due to addition or deletion of item in the list,
   * set to not render all.
 * This is needed for the rendering animation time adjustment per situation. 
 */
  useEffect(() => {
    setRenderAll(false);
  }, [inCompTodos.length, compTodos.length]);

  /** Loads todos by:
   *  - if session storage has data, then receive session storage data.
   *  - if not then call service to get data from the server.
   */
  useEffect(() => {

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

        console.log('fetch todos')
          ;
      }

      dispatch(createFetchAllAction(inCompTodos, compTodos, listType))

      setIsLoading(false);

    }

    fetchTodos();
  }, [dispatch, listDate, listType, sessionKey]);

  /** Update the session storage upon deletion, update, or addition in the list. 
   */
  useEffect(() => {
    // update session storage.
    sessionStorageManager.updateStorage({ inCompTodos, compTodos }, sessionKey);
  }, [compTodos, inCompTodos, sessionKey]);

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

      // ctx dispatch
      dispatch(createToggleDoneItemAction(updateTodo, listType))

      // update server 
      await todoService.updateTodo(updateTodo);
    }
  };

  /**
   * Handles update of task, priority, or dueDate on single item.
   * @param updateTodo 
   */
  const handleUpdate = async (updateTodo: UpdateTodo) => {
    // ctx dispatch
    dispatch(createUpdateItemAction(updateTodo, listType));

    // update server
    await todoService.updateTodo(updateTodo);

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
