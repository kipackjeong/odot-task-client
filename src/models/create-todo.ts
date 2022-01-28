import { ITodo } from "../interfaces/interfaces";
import Priority from "enums/priority.enum";

export default class CreateTodo implements ITodo {
  constructor(
    public task: string,
    public createdAt?: Date,
    public dueDate?: Date,
    public priority?: Priority | string,
    public completed?: boolean
  ) {}
}
