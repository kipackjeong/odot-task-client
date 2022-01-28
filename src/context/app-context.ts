import { createContext } from "react";
import AppContextInterface from "./app-context.interface";

const defaultValue: AppContextInterface = {
  state: {
    user: { name: "Kipack Jeong" },
    todos: [],
    compTodos: [],
  },
  dispatch: () => {},
};
const AppCtx = createContext(defaultValue);

export default AppCtx;
