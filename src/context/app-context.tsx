import React, { Dispatch } from "react";
import ReadTodo from "../models/read-todo";
import AppContextInterface from "./app-context.interface";

const defaultValue: AppContextInterface = {
  state: {
    user: { name: "Kipack Jeong" },
    todos: [],
    compTodos: [],
  },
  dispatch: () => {},
};
const AppCtx = React.createContext<AppContextInterface>(defaultValue);

export default AppCtx;
