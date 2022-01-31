import { useState, useCallback, useEffect, useMemo, EventHandler } from "react";
import { fetchAllAction, updateItemAction } from "../actions/itemActions";
import todoApi from "api/todoApi";
import TodoListType from "enums/todo-list-type.enum";
import ReadTodo from "models/read-todo";
import UpdateTodo from "models/update-todo";
import { SettingsInputComponentOutlined } from "@mui/icons-material";
import todoService from "service/todoService";

// FIXME: task update issue.

const useTodoList = (
  inCompTodos: ReadTodo[],
  compTodos: ReadTodo[],
  isItemAdded: boolean,
  listDate: Date,
  afterFetching: Function,
  dispatch: Function
) => {
  // #region ANCHOR State
  const [checkedItemIds, setCheckedItemIds] = useState<string[]>([]);
  const [updateWaitingList, setUpdateWaitingList] = useState<UpdateTodo[]>([]);
  const [allChecked, setAllChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listType, setListType] = useState(TodoListType.Incompleted);
  const [listChanged, setListChanged] = useState(false);
  // #endregion

  // #region ANCHOR Effects

  useEffect(whenInitialRender, []);
  function whenInitialRender() {
    const loadCallback = (event: any) => {
      event.preventDefault();
      setListChanged(true);
    };
    window.addEventListener("load", loadCallback);
    fetchTodos();

    return () => {
      window.removeEventListener("loadeddata", loadCallback);
    };
  }

  /**When added new item , updated todo properties, and deleted todos
   * must call request to refresh the data from the first.
   */
  useEffect(refreshData, [listDate, listType, listChanged]);

  function refreshData() {
    console.log("refreshData");
    if (updateWaitingList.length > 0) {
      callServiceToUpdate();
      setUpdateWaitingList([]);
    }
    fetchTodos();
  }

  useEffect(whenItemAdded, [isItemAdded]);
  function whenItemAdded() {
    setListChanged(isItemAdded);
  }

  // #endregion

  //#region ANCHOR: Handlers
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

  const handleListTypeToggle = () => {
    if (listType === TodoListType.Incompleted)
      setListType(TodoListType.Completed);
    else setListType(TodoListType.Incompleted);

    console.log("ListType: changed");
  };

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

  const handleRemove = async (event: Event) => {
    event.preventDefault();
    // DELETE request
    await todoService.deleteMultipleTodos(checkedItemIds);

    // empty out checkedItemIds.
    setCheckedItemIds([]);
    // loading
    setIsLoading(true);
    // refresh allChecked.
    setAllChecked(false);

    setListChanged(true);
  };

  const handleDone = async () => {
    // map
    const updateTodos: UpdateTodo[] = [];
    for (var checkedItemId of checkedItemIds) {
      const updateTodo: UpdateTodo = new UpdateTodo(checkedItemId, {
        // the completed status depends on the type of the list currently on.
        // if current list is completed list and user clicks undone, then here should set item.completed = false.
        completed: listType === TodoListType.Completed ? false : true,
      });
      updateTodos.push(updateTodo);
    }

    await todoService.updateMultipleTodos(updateTodos);
    // empty out checkedItemIds.
    setCheckedItemIds([]);
    // loading
    setIsLoading(true);
    // refresh allChecked.
    setAllChecked(false);
    // notify change
    setListChanged(true);
  };

  const handleUpdate = (updateTodo: UpdateTodo) => {
    // update local state setUpdateWaitingList.
    setUpdateWaitingList((prev) => {
      const newList = [...prev];
      // see if updating item exists on local
      let indexOfExistingItem = prev.findIndex(
        (todo) => todo.id === updateTodo.id
      );

      // when the item already exists on updateWaitingList.
      if (indexOfExistingItem !== -1) {
        // get existing item with indexOfExisting Item.
        const existingItem = prev[indexOfExistingItem];

        // copy exsitingItem and updateTodo's property to newItem.
        const newItem = {
          ...existingItem,
          ...updateTodo,
        };

        // replace existingItem with newItem
        newList.splice(indexOfExistingItem, 1, newItem);
      } else {
        newList.push(updateTodo);
      }
      return newList;
    });

    setListChanged(true);
  };
  // #endregion

  // #region ANCHOR Helpers

  // #endregion

  // #region ANCHOR Memo

  /*  Generate key by listDate. */
  const sessionKey = useMemo(() => {
    return `${listDate.toLocaleDateString()},${listType}`;
  }, [listDate, listType]);
  // #endregion

  // #region ANCHOR call service Function

  /**
   * - calls todoService.updateMultipleTodos(updateWaitingList).
   * - dependencies: updateWaitingList.
   */
  const callServiceToUpdate = useCallback(async () => {
    const result = await todoService.updateMultipleTodos(updateWaitingList);
  }, [updateWaitingList]);

  /**
   * - get todos upon listtype and listChanged state.
   */
  const fetchTodos = useCallback(async (): Promise<void> => {
    const todosFromSession: string | null = sessionStorage.getItem(sessionKey);

    let newTodos;

    /** NOTE When session does not have data.
     * - get todos from the service
     * - save todos in session storage.
    .*/
    if (!todosFromSession || todosFromSession === "[]") {
      console.log(`initialFetch: listType ${listType}`);
      newTodos = await todoService.getTodos({
        listType: listType,
        date: listDate,
      });

      // update session storage
      sessionStorage.setItem(sessionKey, JSON.stringify(newTodos));

      // update context
    } else {
      /** NOTE When session has data.
       * - if anything in the list changed or item is added; get todos from the service.
       * - otherwise, just use todos from the session storage.
       */
      // check if there is anything updated.
      if (listChanged || isItemAdded) {
        newTodos = await todoService.getTodos({
          listType: listType,
          date: listDate,
        });
        sessionStorage.setItem(sessionKey, JSON.stringify(newTodos));
      } else {
        newTodos = JSON.parse(todosFromSession);
        for (var todo of newTodos) {
          if (!todo.dueDate) {
            continue;
          }
          todo.dueDate = new Date(todo.dueDate);
        }
      }
    }

    // update context
    dispatch(fetchAllAction(newTodos, listType));

    // reset states.
    setIsLoading(false);
    setListChanged(false);
    afterFetching();
  }, [
    sessionKey,
    dispatch,
    listType,
    afterFetching,
    listDate,
    listChanged,
    isItemAdded,
  ]);
  // #endregion fetchTodos

  return {
    listType,
    isLoading,
    checkedItemIds,
    allChecked,
    handleDone,
    handleRemove,
    handleAllCheckToggle,
    handleCheckToggle,
    handleListTypeToggle,
    handleUpdate,
  };
};

export default useTodoList;
