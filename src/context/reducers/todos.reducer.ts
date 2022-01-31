import { IReducer, ITodo } from "interfaces/interfaces";
import {
  FetchAll,
  AddItem,
  RemoveItem,
  UpdateItem,
} from "context/actions/itemActions";

import React from "react";
import { TodosAction } from "interfaces/interfaces";
import TodoListType from "enums/todo-list-type.enum";

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
todosReducer = function (state, action: TodosAction): ITodo[] {
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
      // swap old item with updated item.
      newTodos.splice(index, 1, newTodo);
      break;
    default:
      break;
  }

  if (listType === TodoListType.Completed) {
    newState.compTodos = [...newTodos];
  } else {
    newState.todos = [...newTodos];
  }

  return newState;
};

export default todosReducer;
