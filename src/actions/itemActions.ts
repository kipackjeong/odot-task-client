import { IStateAction, ITodo } from "../interfaces/interfaces";

export enum ItemActionType {
  FetchAll = "ALL",
  AddItem = "ADD",
  UpdateItem = "UPDATE",
  RemoveItem = "REMOVE",
}

export const { FetchAll, AddItem, RemoveItem, UpdateItem } = ItemActionType;

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
export const removeItemsAction = (todosIdxToRemove: number[]): IStateAction => {
  return {
    type: RemoveItem,
    payload: todosIdxToRemove,
  };
};
export const updateItemAction = (todo: ITodo): IStateAction => {
  return {
    type: UpdateItem,
    payload: todo,
  };
};
