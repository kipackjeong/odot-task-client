import AppCtx from "./app-context";
import React, { useEffect, useReducer, useState } from "react";
import AppContextInterface from "./app-context.interface";
import { IStateAction } from "../interfaces/interfaces";
import axios from "axios";
import { fetchAllAction } from "../actions/itemActions";
import combinedReducer from "../reducers/combine.reducer";

const defaultContext: AppContextInterface = {
  state: {
    user: {
      name: "Kipack Jeong",
    },
    todos: [],
  },
  dispatch: (action: IStateAction) => {},
};

function AppContextProvider(props: any) {
  const children = props.children;

  const [state, dispatch] = useReducer(combinedReducer, defaultContext.state);

  return (
    <AppCtx.Provider value={{ state, dispatch }}>{children}</AppCtx.Provider>
  );
}

export default AppContextProvider;
