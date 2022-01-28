import { ITodo } from "../interfaces/interfaces";
import Priority from "enums/priority.enum";

export default class ReadTodo implements ITodo {
  constructor(
    public id: string,
    public task: string,
    public createdAt: Date,
    public modifiedAt: Date,
    public priority: Priority,
    public completed: boolean,
    public dueDate?: Date
  ) {}
}
