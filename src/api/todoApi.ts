import axios, { AxiosResponse } from "axios";
import { ITodo } from "../interfaces/interfaces";
import CreateTodo from "../models/create-todo";
import ReadTodo from "../models/read-todo";
import UpdateTodo from "../models/update-todo";

class TodoApi {
  url = "http://localhost:3000/items/";

  /* mapping is needed because the date property is received as string from api. */
  private mapTodo(todo: any): ReadTodo {
    // when dueDate is null, don't do anything
    if (!todo.dueDate) {
      return todo;
    }

    todo.dueDate = new Date(todo.dueDate);
    return todo;
  }

  private mapIncomingTodos(response: AxiosResponse): ReadTodo[] {
    const todos: ReadTodo[] = response.data.data;
    todos.map(this.mapTodo);
    return todos;
  }
  get = async (queryStr: string) => {
    const response = await axios.get(this.url + queryStr);
    const todos = this.mapIncomingTodos(response);

    return todos;
  };

  postTodo = async (newItem: CreateTodo): Promise<ReadTodo> => {
    const response = await axios.post(this.url, newItem);
    const createdTodo: ReadTodo = response.data.data;
    return this.mapTodo(createdTodo);
  };

  putTodo = async (updateTodo: UpdateTodo) => {
    const response = await axios.put(
      this.url + updateTodo.id,
      updateTodo.option
    );
  };

  putMultipleTodos = async (updateTodos?: UpdateTodo[]) => {
    await axios.put(this.url, { data: updateTodos });
  };

  deleteTodo = async (todoId: string) => {
    await axios.delete(this.url + todoId);
  };

  deleteMultipleTodos = async (todoIds: string[]) => {
    await axios.delete(this.url, { data: todoIds });
  };
}

export default new TodoApi();
