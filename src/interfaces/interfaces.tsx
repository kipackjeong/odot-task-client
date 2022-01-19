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
  title?: string;
  modifiedAt?: Date;
  priority?: Priority;
}

export interface IStateAction {
  type: string;
  payload: any;
}

export interface ItemAction extends IStateAction {
  type: string;
  value: any;
}

interface IReducer<T = any> {
  (state: T & T[], action: IStateAction): T | T[];
}
export default IReducer;
