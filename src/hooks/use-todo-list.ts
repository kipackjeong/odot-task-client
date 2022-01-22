import { useState, useCallback, useEffect } from "react";
import { fetchAllAction } from "../actions/itemActions";
import todoApi from "../api/todoApi";
import { TodoListType } from "../components/TodoBoard/TodoBoard";
import ReadTodo from "../models/read-todo";

const useTodoList = (
  inCompTodos: ReadTodo[],
  compTodos: ReadTodo[],
  itemAdded: boolean,
  date: Date,
  resetAddItemStatus: Function,
  dispatch: Function
) => {
  // ANCHOR states
  const defaultChecked: string[] = [];
  const [checkedItemIds, setCheckedItemIds] = useState(defaultChecked);
  const [allChecked, setAllChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listType, setListType] = useState(TodoListType.Incompleted);
  const [listChanged, setListChanged] = useState(false);
  const [doneListChanged, setDoneListChanged] = useState(false);

  // ANCHOR helpers
  const fetchData = async (): Promise<void> => {
    const sessionKey = `${date.toLocaleDateString()},${listType}`;
    const todosFromSession: string | null = sessionStorage.getItem(sessionKey);
    let newTodos;

    // if session does not have data, doesn't matter if it's incompleted or completed list, need to fetch from api.
    if (!todosFromSession) {
      console.log("data is not in session");
      switch (listType) {
        case TodoListType.Completed:
          newTodos = await todoApi.getCompletedTodos(date);
          setDoneListChanged(false);
          dispatch(fetchAllAction(newTodos, TodoListType.Completed));

          break;
        case TodoListType.Incompleted:
          newTodos = await todoApi.getInCompletedTodos(date);
          setListChanged(false);
          dispatch(fetchAllAction(newTodos, TodoListType.Incompleted));
          resetAddItemStatus();
          break;
        default:
          break;
      }

      // update session storage
      sessionStorage.setItem(sessionKey, JSON.stringify(newTodos));
      setIsLoading(false);
      return;
    }

    // if session has data, and if on incompleted list.
    if (listType === TodoListType.Incompleted) {
      // check if there should be any changes.
      if (listChanged || itemAdded) {
        // there is a change then call api
        newTodos = await todoApi.getInCompletedTodos(date);
        // update session storage
        sessionStorage.setItem(sessionKey, JSON.stringify(newTodos));
        dispatch(fetchAllAction(newTodos, TodoListType.Incompleted));
        resetAddItemStatus();
        setListChanged(false);
      } else {
        // no change needed. get data from session.
        const sessionData = JSON.parse(sessionStorage.getItem(sessionKey)!);
        setListChanged(false);
        dispatch(fetchAllAction(sessionData, TodoListType.Incompleted));
      }
    }

    // if session has data, and if on completed list.
    if (listType === TodoListType.Completed) {
      console.log("complist");
      // if there is any changes need to be made.
      if (doneListChanged) {
        newTodos = await todoApi.getCompletedTodos(date);
        sessionStorage.setItem(sessionKey, JSON.stringify(newTodos));
        dispatch(fetchAllAction(newTodos, TodoListType.Completed));
        setDoneListChanged(false);
      } else {
        // if no change needed, just get from local storage
        const sessionData = JSON.parse(sessionStorage.getItems(sessionKey));
        dispatch(fetchAllAction(sessionData, TodoListType.Completed));
      }
    }

    setIsLoading(false);

    // resets prop from TodoBoard,itemAdded to false.
  };

  // useEffects

  // ANCHOR useEffects
  useEffect(() => {
    console.log("initial fetch");
    fetchData();
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchData();
  }, [listType, itemAdded, listChanged, doneListChanged]);

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

  // ANCHOR: handlers

  const handleListTypeToggle = () => {
    if (listType === TodoListType.Incompleted)
      setListType(TodoListType.Completed);
    else setListType(TodoListType.Incompleted);
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
    if (listType === TodoListType.Incompleted) {
      setListChanged(true);
    } else {
      setListType(TodoListType.Incompleted);
      setDoneListChanged(true);
    }
  };

  const handleDone = async () => {
    // need to update all todos checked
    await todoApi.updateMultipleTodos(checkedItemIds);
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
  };
};

export default useTodoList;