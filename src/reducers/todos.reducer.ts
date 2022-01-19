import IReducer, { ITodo, IStateAction } from "../interfaces/interfaces";
import {
  FetchAll,
  AddItem,
  RemoveItem,
  UpdateItem,
} from "../actions/itemActions";

let todosReducer: IReducer<ITodo>;
todosReducer = function (state: ITodo[], action: IStateAction): ITodo[] {
  const { type, payload } = action;
  let newTodos = [...state];
  let index;
  switch (type) {
    case FetchAll:
      newTodos = [...payload];
      break;
    case AddItem:
      newTodos.push(payload);
      break;
    case RemoveItem:
      index = newTodos.findIndex((todo) => todo.id === payload);
      newTodos.splice(index, 1);
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
