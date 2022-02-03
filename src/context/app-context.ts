import { createContext } from "react";
import AppContextInterface from "./app-context.interface";

const defaultValue: AppContextInterface = {
  state: {
    user: { name: "Kipack Jeong" },
    inCompTodos: [],
    compTodos: [],
    updateList: [],
  },
  dispatch: () => { },
};
const AppCtx = createContext(defaultValue);

export default AppCtx;
