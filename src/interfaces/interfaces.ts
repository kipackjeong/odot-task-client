import Priority from "enums/priority.enum";

export interface IUser {
  name: string;
}
export interface ITodo {
  id?: string;
  task: string;
  priority?: Priority | string;
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

export interface IReducer<T = any> {
  (state: T & T[] & any, action: IStateAction): T | T[];
}
