import { useState, useCallback, useEffect } from "react";
import { fetchAllAction, updateItemAction } from "../actions/itemActions";
import todoApi from "api/todoApi";
import TodoListType from "enums/todo-list-type.enum";
import ReadTodo from "models/read-todo";
import UpdateTodo from "models/update-todo";

const useTodoList = (
  inCompTodos: ReadTodo[],
  compTodos: ReadTodo[],
  isItemAdded: boolean,
  listDate: Date,
  afterFetching: Function,
  dispatch: Function
) => {
  // ANCHOR state
  const [checkedItemIds, setCheckedItemIds] = useState<string[]>([]);
  const [updateWaitingList, setUpdateWaitingList] = useState<UpdateTodo[]>([]);

  const [allChecked, setAllChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listType, setListType] = useState(TodoListType.Incompleted);
  const [listChanged, setListChanged] = useState(false);
  const [doneListChanged, setDoneListChanged] = useState(false);

  // ANCHOR useEffects
  useEffect(() => {
    console.log("initial fetch");
    fetchData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (updateWaitingList.length > 0) {
      updateData();
      setListChanged(true);
      setDoneListChanged(true);
    }

    fetchData();
  }, [listDate, listType, isItemAdded, listChanged, doneListChanged]);

  // ANCHOR: handlers
  const handleAllCheckToggle = () => {
    // remove all check
    if (checkedItemIds.length > 0) {
      setCheckedItemIds([]);
      setAllChecked(false);
    } else {
      // check all
      setCheckedItemIds((checkedIds) => {
        const newCheckedIds: string[] = [];

        let todos;
        if (listType === TodoListType.Incompleted) {
          todos = inCompTodos;
        } else {
          todos = compTodos;
        }

        for (var todo of todos) {
          newCheckedIds.push(todo.id);
        }

        return newCheckedIds;
      });
      setAllChecked((prev) => !prev);
    }
  };

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
    await todoApi.deleteMultipleTodos(checkedItemIds);

    // empty out checkedItemIds.
    setCheckedItemIds([]);
    // loading
    setIsLoading(true);
    // refresh allChecked.
    setAllChecked(false);

    // notify change
    // when incompleted item is deleted
    if (listType === TodoListType.Incompleted) {
      setListChanged(true);
    } else {
      // when completed item is deleted
      setDoneListChanged(true);
    }
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

    await todoApi.updateMultipleTodos(updateTodos);
    // empty out checkedItemIds.
    setCheckedItemIds([]);
    // loading
    setIsLoading(true);
    // refresh allChecked.
    setAllChecked(false);
    // notify change
    setListChanged(true);
    setDoneListChanged(true);
  };

  const handleUpdate = (updateTodo: UpdateTodo) => {
    console.log(`useTodoList: handleUpdate: ${JSON.stringify(updateTodo)}`);

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
  };

  // ANCHOR helpers

  const updateData = async () => {
    console.log("call api to updateData");

    const result = await todoApi.updateMultipleTodos(updateWaitingList);

    setListChanged(true);
    setUpdateWaitingList([]);
  };

  const fetchData = async (): Promise<void> => {
    console.log("fetchData");
    const sessionKey = `${listDate.toLocaleDateString()},${listType}`;
    const todosFromSession: string | null = sessionStorage.getItem(sessionKey);
    let newTodos;

    // if session does not have data, doesn't matter if it's incompleted or completed list, need to fetch from api.
    if (!todosFromSession) {
      switch (listType) {
        case TodoListType.Completed:
          newTodos = await todoApi.getCompletedTodos(listDate);
          setDoneListChanged(false);
          dispatch(fetchAllAction(newTodos, TodoListType.Completed));

          break;
        case TodoListType.Incompleted:
          newTodos = await todoApi.getInCompletedTodos(listDate);
          console.log(typeof newTodos[0].dueDate);
          setListChanged(false);

          dispatch(fetchAllAction(newTodos, TodoListType.Incompleted));
          afterFetching();

          break;
        default:
          break;
      }

      // update session storage
      sessionStorage.setItem(sessionKey, JSON.stringify(newTodos));
      setIsLoading(false);
      return;
    }

    // session has data
    const parsedTodosFromSession = JSON.parse(todosFromSession);
    // if session has data, and if on incompleted list.
    if (listType === TodoListType.Incompleted) {
      // check if there should be any changes.
      if (listChanged || isItemAdded) {
        // there is a change then call api
        newTodos = await todoApi.getInCompletedTodos(listDate);
        // update session storage
        sessionStorage.setItem(sessionKey, JSON.stringify(newTodos));
        dispatch(fetchAllAction(newTodos, TodoListType.Incompleted));
        afterFetching();
        setListChanged(false);
      } else {
        // no change needed. get data from session.

        for (var todo of parsedTodosFromSession) {
          if (!todo.dueDate) {
            continue;
          }
          todo.dueDate = new Date(todo.dueDate);
        }
        setListChanged(false);
        // update context
        dispatch(
          fetchAllAction(parsedTodosFromSession, TodoListType.Incompleted)
        );
      }
    }

    // if session has data, and if on completed list.
    if (listType === TodoListType.Completed) {
      // if there is any changes need to be made.
      if (doneListChanged) {
        newTodos = await todoApi.getCompletedTodos(listDate);
        sessionStorage.setItem(sessionKey, JSON.stringify(newTodos));
        dispatch(fetchAllAction(newTodos, TodoListType.Completed));
        setDoneListChanged(false);
      } else {
        // if no change needed, just get from local storage

        for (var todo of parsedTodosFromSession) {
          if (!todo.dueDate) {
            continue;
          }
          todo.dueDate = new Date(todo.dueDate);
        }
        dispatch(
          fetchAllAction(parsedTodosFromSession, TodoListType.Completed)
        );
      }
    }

    setIsLoading(false);

    // resets prop from TodoBoard,isItemAdded to false.
  };

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
