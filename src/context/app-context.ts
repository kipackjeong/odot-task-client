import { createContext } from "react";
import AppContextInterface from "./app-context.interface";

const defaultValue: AppContextInterface = {
  state: {
    listDate: new Date(Date.now()),
    inCompTodos: [],
    compTodos: [],
    updateWaitingList: [],
  },
  dispatch: () => { },
};
const AppCtx = createContext(defaultValue);

export default AppCtx;
