import { ITodo, Priority } from "../interfaces/interfaces";

export default class CreateTodo implements ITodo {
  constructor(
    public task: string,
    public dueDate?: string,
    public priority?: Priority,
    public completed?: boolean
  ) {}
}
