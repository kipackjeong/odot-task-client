import IReducer, { ITodo, IStateAction } from "../interfaces/interfaces";
import {
  FetchAll,
  AddItem,
  RemoveItem,
  UpdateItem,
} from "../actions/itemActions";

const fetchAllItems = (newTodos: ITodo[], items: ITodo[]) => {
  newTodos = [...items];
  return newTodos;
};

const addNewItem = (newTodos: ITodo[], item: ITodo) => {
  newTodos.push(item);
};

const removeItem = (newTodos: ITodo[], todoIdxsToRemove: number[]) => {
  for (var idx of todoIdxsToRemove) {
    newTodos.splice(idx, 1);
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
      newTodos = removeItem(newTodos, payload);
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
