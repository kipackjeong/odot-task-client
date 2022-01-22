import { IStateAction, ITodo } from "../interfaces/interfaces";
import { TodoListType } from "../components/TodoBoard/TodoBoard";

export enum ItemActionType {
  FetchAll = "ALL",
  AddItem = "ADD",
  UpdateItem = "UPDATE",
  RemoveItem = "REMOVE",
}

export const { FetchAll, AddItem, RemoveItem, UpdateItem } = ItemActionType;

export const fetchAllAction = (
  todos: ITodo[],
  listType: TodoListType
): IStateAction => {
  return {
    type: FetchAll,
    payload: { listType: listType, data: todos },
  };
};
export const addItemAction = (
  todo: ITodo,
  listType: TodoListType
): IStateAction => {
  return {
    type: AddItem,
    payload: { listType: listType, data: todo },
  };
};
export const removeItemsAction = (
  todosIdsToRemove: string[],
  listType: TodoListType
): IStateAction => {
  return {
    type: RemoveItem,
    payload: { listType: listType, data: todosIdsToRemove },
  };
};
export const updateItemAction = (
  todo: ITodo,
  listType: TodoListType
): IStateAction => {
  return {
    type: UpdateItem,
    payload: { listType: listType, data: todo },
  };
};
