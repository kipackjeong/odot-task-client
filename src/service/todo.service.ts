import todoApi from "api/todoApi";
import TodoListType from "enums/todo-list-type.enum";
import ReadTodo from "models/read-todo";
import UpdateTodo from "models/update-todo";
import dateConverter from "utilities/date-converter.utility";
import CreateTodo from "../models/create-todo";

type GetAllOption = {
  listType:
  | TodoListType.ALL
  | TodoListType.Completed
  | TodoListType.Incompleted;
  date: Date;
};

class TodoService {
  /**
   *  @method GET
   *  @param GetAllOption
   * s
   */
  async getTodos(option?: GetAllOption): Promise<ReadTodo[]> {
    let queryStr = "";

    let result;

    if (option) {

      switch (option.listType) {

        case TodoListType.Completed:
          queryStr = "?completed=true";
          break;

        case TodoListType.Incompleted:
          queryStr = "?completed=false";

      }

      if (option.date) {

        queryStr += `&date=${option.date}`;

      }
      queryStr += '&sort=createdAt,ASC'
    }
    result = await todoApi.get(queryStr);

    dateConverter.convertTodosDate(result);
    return result;
  }

  async createTodo(todo: CreateTodo): Promise<ReadTodo> {

    const result = await todoApi.postTodo(todo);

    dateConverter.convertTodoDate(result);

    return result;
  }

  async updateTodo(updateTodo: UpdateTodo) {
    await todoApi.putTodo(updateTodo);
  }

  async updateMultipleTodos(updateTodos: UpdateTodo[]) {
    localStorage.setItem("updateTodos", JSON.stringify(updateTodos));
    await todoApi.putMultipleTodos(updateTodos);
  }

  async deleteTodo(todoId: string) {
    await todoApi.deleteTodo(todoId);
  }

  async deleteMultipleTodos(todoIds: string[]) {
    await todoApi.deleteMultipleTodos(todoIds);
  }
}

export default new TodoService();
