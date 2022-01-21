import axios from "axios";
import { ITodo } from "../interfaces/interfaces";
import CreateTodo from "../models/create-todo";
import ReadTodo from "../models/read-todo";

class TodoApi {
  url = "http://localhost:3000/items/";

  getAllTodos = async () => {
    const response = await axios.get(this.url);
    return response.data.data;
  };

  getCompletedTodos = async (date: Date) => {
    const response = await axios.get(`${this.url}?completed=true&date=${date}`);

    return response.data.data;
  };
  getInCompletedTodos = async (date: Date) => {
    const reponse = await axios.get(`${this.url}?completed=false&date=${date}`);
    return reponse.data.data;
  };

  createTodo = async (newItem: CreateTodo): Promise<ReadTodo> => {
    const response = await axios.post(this.url, newItem);
    return response.data.data;
  };

  updateTodo = async (id: string, updatingItem: ITodo) => {
    const response = await axios.put(this.url + id, updatingItem);
  };

  updateMultipleTodos = async (todoIds: string[]) => {
    await axios.put(this.url, { data: todoIds });
  };

  deleteTodo = async (todoId: string) => {
    await axios.delete(this.url + todoId);
  };

  deleteMultipleTodos = async (todoIds: string[]) => {
    await axios.delete(this.url, { data: todoIds });
  };
}

export default new TodoApi();
