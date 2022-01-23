import { useState, useCallback, useEffect } from "react";
import { fetchAllAction } from "../actions/itemActions";
import todoApi from "../api/todoApi";
import { TodoListType } from "../components/TodoBoard/TodoBoard";
import ReadTodo from "../models/read-todo";
import UpdateTodo from "../models/update-todo";

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
  const [toUpdateTodos, setToUpdateTodos] = useState<UpdateTodo[]>([]);
  console.log(toUpdateTodos);

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
    if (toUpdateTodos.length > 0) {
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
    console.log("useTodoList - handleUpdate");
    // see if updating item exists on local
    const newUpdateTodoId = updateTodo.id;

    const existingUpdate = toUpdateTodos.find(
      (todo: UpdateTodo) => todo.id === newUpdateTodoId
    );
    if (existingUpdate) {
      const localUpdatedTodo = {
        ...existingUpdate,
        ...updateTodo,
      };
    } else {
      toUpdateTodos.push(updateTodo);
    }
  };

  // ANCHOR helpers

  const updateData = async () => {
    console.log("call api to updateData");
    await todoApi.updateMultipleTodos(toUpdateTodos);
    setToUpdateTodos([]);
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
        const sessionData = JSON.parse(sessionStorage.getItem(sessionKey)!);
        setListChanged(false);
        dispatch(fetchAllAction(sessionData, TodoListType.Incompleted));
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
        const sessionData = JSON.parse(sessionStorage.getItem(sessionKey)!);
        dispatch(fetchAllAction(sessionData, TodoListType.Completed));
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
