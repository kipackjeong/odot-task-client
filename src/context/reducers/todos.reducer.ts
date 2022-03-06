import { IReducer, ITodo } from "interfaces/interfaces";
import {
  ItemActionType
} from "context/app-context.enum";
import { TodosAction } from "interfaces/interfaces";
import TodoListType from "enums/todo-list-type.enum";
import UpdateTodo from "models/update-todo";
import { transferTodoToOtherList, updateCurrentList } from './todos.reducer.helper';


const addNewItem = (newState: ITodo[], newTodo: ITodo) => {
  newState.push(newTodo);
};

const removeItems = (newState: ITodo[], todoIdsToRemove: string[]) => {
  for (var i = 0; i < todoIdsToRemove.length; i++) {
    newState = newState.filter((newTodo) => {
      return !todoIdsToRemove.includes(newTodo.id!);
    });
  }

  return newState;
}

let todosReducer: IReducer;
todosReducer = function (state, action: TodosAction): ITodo[] {
  const { type, payload } = action;

  const newState = { ...state };
  newState.compTodos = [...state.compTodos];
  newState.inCompTodos = [...state.inCompTodos];
  const listType = payload.listType;

  let newTodos =
    payload.listType === TodoListType.Completed
      ? [...state.compTodos]
      : [...state.inCompTodos];



  let updateTodo: UpdateTodo;

  switch (type) {

    /* Fetches all the items included in selected date. */
    case ItemActionType.FetchAll:

      newState.compTodos = payload.compTodos;
      newState.inCompTodos = payload.inCompTodos;

      break;

    /* Add Item in the state.inCompTodos */
    case ItemActionType.AddItem:

      const targetList = listType === TodoListType.Completed ? newState.compTodos : newState.inCompTodos;
      addNewItem(targetList, payload.newTodo)

      break;

    /* Remove Item from whether state.inCompTodos or state.compTodos */
    case ItemActionType.RemoveItems:

      newTodos = removeItems(newTodos, payload.todosIdsToRemove);

      if (payload.listType === TodoListType.Completed)
        newState.compTodos = newTodos;
      else
        newState.inCompTodos = newTodos;

      break;

    /* Update item in context */
    case ItemActionType.UpdateItem:
      updateTodo = payload.updateTodo;

      updateCurrentList(newTodos, updateTodo);

      if (payload.listType === TodoListType.Completed) {
        newState.compTodos = newTodos;
      } else {
        newState.inCompTodos = newTodos;
      }
      break;

    /* Updates items' completion status. */
    case ItemActionType.ToggleDone:
      // payload.updateTodos : UpdateTodo []

      // remove seleceted todos from the current list inCompTodos | compTodo.

      updateTodo = payload.updateTodo;

      transferTodoToOtherList(updateTodo, newState.compTodos, newState.inCompTodos, listType);

      break;


    default:
      break;
  }

  return newState;
};

export default todosReducer;
