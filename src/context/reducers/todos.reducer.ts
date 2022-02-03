import { IReducer, ITodo } from "interfaces/interfaces";
import {
  ItemActionType
} from "context/app-context.enum";

import React from "react";
import { TodosAction } from "interfaces/interfaces";
import TodoListType from "enums/todo-list-type.enum";
import UpdateTodo from "models/update-todo";
import ReadTodo from "models/read-todo";

const fetchAllItems = (newState: ITodo[], items: ITodo[]) => {
  newState = [...items];
  return newState;
};

const addNewItem = (newState: ITodo[], item: ITodo) => {
  newState.push(item);
};

const removeItems = (newState: ITodo[], todoIdsToRemove: string[]) => {
  for (var i = 0; i < todoIdsToRemove.length; i++) {
    newState = newState.filter((newTodo) => {
      return !todoIdsToRemove.includes(newTodo.id!);
    });
  }

  return newState;
};

let todosReducer: IReducer;
todosReducer = function (state, action: TodosAction): ITodo[] {
  const { type, payload } = action;

  const newState = { ...state };

  let newTodos =
    payload.listType === TodoListType.Completed
      ? [...state.compTodos]
      : [...state.inCompTodos];

  let index;
  // TODO: change functionality of all todo reducer actions.
  switch (type) {
    case ItemActionType.FetchAll:
      newTodos = fetchAllItems(newTodos, payload.todos);
      break;
    case ItemActionType.AddItem:
      addNewItem(newTodos, payload.newTodo);
      break;
    case ItemActionType.RemoveItems:
      newTodos = removeItems(newTodos, payload.todosIdsToRemove);
      break;


    /* Update item in context, then add it in updateWaitingList */
    // TODO: Test functionality.
    case ItemActionType.UpdateItem:
      const todoToUpdate: UpdateTodo = payload.todoToUpdate;

      const updateTodos = () => {
        index = newTodos.findIndex((todo) => todo.id === payload.todoToUpdate.id);

        const newTodo = { ...newTodos[index], ...payload.todoIdsToRemove.option };

        // swap old item with updated item.
        newTodos.splice(index, 1, newTodo);
      }

      const updateUpdateWaitingList = () => {
        /* add into updateWaitingList */
        // make copy of updateWaitingList
        const newUpdateWaitingList = [...state.updateWaitingList]

        // check for pre existence.
        const indexOfExisting = state.updateWaitingList.indexOf((todo: UpdateTodo) => todo.id === todoToUpdate.id)
        const doesExist = indexOfExisting !== -1 ? true : false

        if (doesExist) {
          const newTodoToUpdate = { ...state.updateWaitingList[indexOfExisting], ...todoToUpdate }

          newUpdateWaitingList.splice(indexOfExisting, 1, newTodoToUpdate);
        }
        else {
          newUpdateWaitingList.push(todoToUpdate);
        }
      }

      updateTodos();
      updateUpdateWaitingList();
      break;

    default:
      break;
  }

  if (payload.listType === TodoListType.Completed) {
    newState.compTodos = newTodos;
  } else {
    newState.inCompTodos = newTodos;
  }
  return newState;
};

export default todosReducer;
