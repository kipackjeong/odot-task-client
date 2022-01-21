import { ITodo, Priority } from "../interfaces/interfaces";

export default class ReadTodo implements ITodo {
  constructor(
    public id: string,
    public task: string,
    public createdAt: string,
    public modifiedAt: string,
    public dueDate: string,
    public priority: Priority,
    public completed: boolean
  ) {}
}
