import UpdateTodo from "../models/update-todo";

export enum Priority {
  HIGH = 3,
  MEDIUM = 2,
  LOW = 1,
}

export interface IUser {
  name: string;
}
export interface ITodo {
  id?: string;
  task: string;
  priority?: Priority;
  completed?: boolean;
}

export interface IStateAction {
  type: string;
  payload: any;
}

export interface TodosAction extends IStateAction {
  type: string;
  payload: any;
}

export interface UpdateTodoDataObject {
  todoId: string;
  updateTodo: UpdateTodo;
}

interface IReducer<T = any> {
  (state: T & T[] & any, action: IStateAction): T | T[];
}
export default IReducer;
