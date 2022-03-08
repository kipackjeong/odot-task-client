import { IStateAction, ITodo } from "../../interfaces/interfaces";
import TodoListType from "enums/todo-list-type.enum";
import { ItemActionType } from "context/app-context.enum";
import UpdateTodo from '../../models/update-todo';
import ReadTodo from "models/read-todo";


export const createFetchAllAction = (
  inCompTodos: ReadTodo[],
  compTodos: ReadTodo[],
  listType: TodoListType
): IStateAction => {
  return {
    type: ItemActionType.FetchAll,
    payload: { listType: listType, inCompTodos, compTodos },
  };
};
export const createAddItemAction = (
  newTodo: ITodo,
  listType: TodoListType
): IStateAction => {
  return {
    type: ItemActionType.AddItem,
    payload: { listType: listType, newTodo: newTodo },
  };
};
export const createRemoveItemsAction = (
  todosIdsToRemove: string[],
  listType: TodoListType
): IStateAction => {
  return {
    type: ItemActionType.RemoveItems,
    payload: { listType: listType, todosIdsToRemove: todosIdsToRemove },
  };
};
export const createUpdateItemAction = (
  updateTodo: UpdateTodo,
  listType: TodoListType
): IStateAction => {
  return {
    type: ItemActionType.UpdateItem,
    payload: { listType: listType, updateTodo: updateTodo },
  };
};

export const createToggleDoneItemAction = (
  updateTodo: UpdateTodo,
  listType: TodoListType
): IStateAction => {
  return {
    type: ItemActionType.ToggleDone,
    payload: {
      listType: listType, updateTodo: updateTodo
    }
  }
}

export const createClearWaitingList = (): IStateAction => {
  return {
    type: ItemActionType.ClearWaitingList,
    payload: {}
  }
}
