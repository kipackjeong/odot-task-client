import IReducer, { ITodo, IStateAction } from "../interfaces/interfaces";
import {
  FetchAll,
  AddItem,
  RemoveItem,
  UpdateItem,
} from "../actions/itemActions";
import ReadTodo from "../models/read-todo";

const fetchAllItems = (newTodos: ITodo[], items: ITodo[]) => {
  newTodos = [...items];
  return newTodos;
};

const addNewItem = (newTodos: ITodo[], item: ITodo) => {
  newTodos.push(item);
};

const removeItem = (newTodos: ITodo[], todoIds: string[]) => {
  for (var i = 0; i < todoIds.length; i++) {
    newTodos = newTodos.filter((newTodo) => {
      return todoIds.includes(newTodo.id || "");
    });
  }
  return newTodos;
};

let todosReducer: IReducer<ITodo>;
todosReducer = function (state: ITodo[], action: IStateAction): ITodo[] {
  const { type, payload } = action;
  let newTodos = [...state];
  let index;
  switch (type) {
    case FetchAll:
      newTodos = fetchAllItems(newTodos, payload);
      break;
    case AddItem:
      addNewItem(newTodos, payload);
      break;
    case RemoveItem:
      const todoIds: string[] = payload;
      newTodos = removeItem(newTodos, todoIds);
      break;
    case UpdateItem:
      index = newTodos.findIndex((todo) => todo.id === payload.id);
      const newTodo = { ...newTodos[index], ...payload.todo };
      newTodos.splice(index, 1, newTodo);
      break;
    default:
      break;
  }
  return newTodos;
};

export default todosReducer;
