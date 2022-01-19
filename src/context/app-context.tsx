import React, { Dispatch } from "react";
import AppContextInterface from "./app-context.interface";

const defaultValue: AppContextInterface = {
  state: {
    user: { name: "Kipack Jeong" },
    todos: [],
  },
  dispatch: () => {},
};
const AppCtx = React.createContext<AppContextInterface>(defaultValue);

export default AppCtx;
