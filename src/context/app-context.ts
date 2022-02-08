import { createContext } from "react";
import AppContextInterface from "./app-context.interface";

const defaultValue: AppContextInterface = {
  state: {
    inCompTodos: [],
    compTodos: [],
    updateWaitingList: [],
  },
  dispatch: () => { },
};
const AppCtx = createContext(defaultValue);

export default AppCtx;
