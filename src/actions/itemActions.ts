import { IStateAction, ITodo } from "../interfaces/interfaces";

export enum ItemActionType {
  FetchAll = "ALL",
  AddItem = "ADD",
  RemoveItem = "REMOVE",
  DeleteItem = "DELETE",
}

export const { FetchAll, AddItem, RemoveItem, DeleteItem } = ItemActionType;

export const fetchAllAction = (todos: ITodo): IStateAction => {
  return {
    type: FetchAll,
    payload: todos,
  };
};
export const addItemAction = (todo: ITodo): IStateAction => {
  return {
    type: AddItem,
    payload: todo,
  };
};
