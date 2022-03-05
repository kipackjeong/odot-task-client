import axios, { AxiosResponse } from "axios";
import { ITodo } from "../interfaces/interfaces";
import CreateTodo from "../models/create-todo";
import ReadTodo from "../models/read-todo";
import UpdateTodo from "../models/update-todo";

class TodoApi {
  url = "https://odot-task-server-heroku.herokuapp.com/items/";


  get = async (queryStr: string) => {
    const response: AxiosResponse = await axios.get(this.url + queryStr);
    const todos = response.data.data;

    return todos;
  };

  postTodo = async (newItem: CreateTodo): Promise<ReadTodo> => {
    const response: AxiosResponse = await axios.post(this.url, newItem);
    const createdTodo: ReadTodo = response.data.data;
    return createdTodo;
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
