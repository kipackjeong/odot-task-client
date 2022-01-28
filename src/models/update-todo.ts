import { ITodo } from "../interfaces/interfaces";
import Priority from "enums/priority.enum";

export interface UpdateTodoOption {
  task?: string;
  priority?: Priority;
  dueDate?: Date;
  completed?: boolean;
}
export default class UpdateTodo implements Partial<ITodo> {
  constructor(public id: string, public option: UpdateTodoOption) {}
}
