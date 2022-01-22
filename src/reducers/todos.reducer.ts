import IReducer, { ITodo, IStateAction } from "../interfaces/interfaces";
import {
  FetchAll,
  AddItem,
  RemoveItem,
  UpdateItem,
} from "../actions/itemActions";
import { TodoListType } from "../components/TodoBoard/TodoBoard";
import React from "react";

const fetchAllItems = (newState: ITodo[], items: ITodo[]) => {
  newState = [...items];
  return newState;
};

const addNewItem = (newState: ITodo[], item: ITodo) => {
  newState.push(item);
};

const removeItem = (newState: ITodo[], todoIds: string[]) => {
  for (var i = 0; i < todoIds.length; i++) {
    newState = newState.filter((newTodo) => {
      return todoIds.includes(newTodo.id || "");
    });
  }
  return newState;
};

let todosReducer: IReducer;
todosReducer = function (state, action: IStateAction): ITodo[] {
  console.log("todoReducer");
  const { type } = action;
  const { listType, data } = action.payload;

  const newState = { ...state };
  let newTodos =
    listType === TodoListType.Completed
      ? [...state.compTodos]
      : [...state.todos];

  let index;
  switch (type) {
    case FetchAll:
      newTodos = fetchAllItems(newTodos, data);
      break;
    case AddItem:
      addNewItem(newTodos, data);
      break;
    case RemoveItem:
      const todoIds: string[] = data;
      newTodos = removeItem(newTodos, todoIds);
      break;
    case UpdateItem:
      index = newTodos.findIndex((todo) => todo.id === data.id);
      const newTodo = { ...newTodos[index], ...data.todo };
      newTodos.splice(index, 1, newTodo);
      break;
    default:
      break;
  }
  console.log("todosReducer: updated state: " + newTodos);

  if (listType === TodoListType.Completed) {
    newState.compTodos = [...newTodos];
  } else {
    newState.todos = [...newTodos];
  }

  return newState;
};

export default todosReducer;
