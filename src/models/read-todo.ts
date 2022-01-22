import { ITodo, Priority } from "../interfaces/interfaces";

export default class ReadTodo implements ITodo {
  constructor(
    public id: string,
    public task: string,
    public createdAt: Date,
    public modifiedAt: Date,
    public dueDate: Date,
    public priority: Priority,
    public completed: boolean
  ) {}
}
