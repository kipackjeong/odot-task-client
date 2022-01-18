export enum Priority {
  HIGH = 3,
  MEDIUM = 2,
  LOW = 1,
}

export interface IUser {
  name: string;
}
export interface ITodo {
  title: string;
  description: string;
  modifiedAt?: Date;
  priority?: Priority;
}

export interface IState {
  user: IUser;
  todos: ITodo[];
}
export interface IStateAction {
  type: string;
  payload: any;
}

export interface ItemAction extends IStateAction {
  type: string;
  value: any;
}

interface IReducer<T> {
  (state: IState, action: IStateAction): IState;
}
export default IReducer;
