import axios, { AxiosResponse } from "axios";
import { ITodo } from "../interfaces/interfaces";
import CreateTodo from "../models/create-todo";
import ReadTodo from "../models/read-todo";
import UpdateTodo from "../models/update-todo";

class TodoApi {
  url = "http://localhost:3000/items/";
  private mapTodo(todo: any) {
    if (!todo.dueDate) {
      return todo;
    }

    todo.dueDate = new Date(todo.dueDate);
    return todo;
  }

  private mapIncomingTodos(response: AxiosResponse) {
    const todos = response.data.data;
    todos.map(this.mapTodo);
    return todos;
  }
  getAllTodos = async () => {
    console.log("getAllTodos");
    const response = await axios.get(this.url);
    const todos = this.mapIncomingTodos(response);
    console.log(todos);
    return todos;
  };

  getCompletedTodos = async (date: Date) => {
    const response = await axios.get(`${this.url}?completed=true&date=${date}`);
    const todos = this.mapIncomingTodos(response);
    return todos;
  };
  getInCompletedTodos = async (date: Date) => {
    const response = await axios.get(
      `${this.url}?completed=false&date=${new Date(date)}`
    );
    const todos = this.mapIncomingTodos(response);
    return todos;
  };

  createTodo = async (newItem: CreateTodo): Promise<ReadTodo> => {
    const response = await axios.post(this.url, newItem);
    const createdTodo: ReadTodo = response.data.data;
    console.log(createdTodo);
    return this.mapTodo(createdTodo);
  };

  updateTodo = async (id: string, updatingItem: ITodo) => {
    const response = await axios.put(this.url + id, updatingItem);
  };

  updateMultipleTodos = async (updateTodos?: UpdateTodo[]) => {
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
