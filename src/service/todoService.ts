import todoApi from "api/todoApi";
import TodoListType from "enums/todo-list-type.enum";
import ReadTodo from "models/read-todo";
import UpdateTodo from "models/update-todo";
import CreateTodo from "../models/create-todo";

type getAllOption = {
  listType:
    | TodoListType.ALL
    | TodoListType.Completed
    | TodoListType.Incompleted;
  date: Date;
};

class TodoService {
  /**
   *  @method GET
   *  @param option? : getAllOption
   * s
   */

  async getTodos(option?: getAllOption): Promise<ReadTodo[]> {
    let queryStr = "";
    let date = new Date(Date.now());
    let result;
    if (option) {
      switch (option.listType) {
        case TodoListType.Completed:
          queryStr = "?completed=true";
          break;
        case TodoListType.Incompleted:
          queryStr = "?completed=false";
          break;
      }

      if (option.date) {
        queryStr += `&date=${option.date}`;
      }
    }

    console.log(`todoService : getTodos() : queryStr ${queryStr}`);
    result = await todoApi.get(queryStr);
    console.log(`todoService : getTodos() : todos ${result}`);

    return result;
  }

  async createTodo(todo: CreateTodo): Promise<ReadTodo> {
    const result = await todoApi.postTodo(todo);
    return result;
  }
  async updateTodo(updateTodo: UpdateTodo) {
    const result = await todoApi.putTodo(updateTodo);
  }
  async updateMultipleTodos(updateTodos: UpdateTodo[]) {
    const result = await todoApi.putMultipleTodos(updateTodos);
  }
  async deleteTodo(todoId: string) {
    const result = await todoApi.deleteTodo(todoId);
  }
  async deleteMultipleTodos(todoIds: string[]) {
    const result = await todoApi.deleteMultipleTodos(todoIds);
  }
}

export default new TodoService();
