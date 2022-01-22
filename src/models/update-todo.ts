import { ITodo, Priority } from "../interfaces/interfaces";

export interface UpdateTodoOption {
  task?: string;
  priority?: Priority;
  dueDate?: Date;
  completed?: boolean;
}
export default class UpdateTodo implements Partial<ITodo> {
  constructor(public id: string, public option: UpdateTodoOption) {}
}
