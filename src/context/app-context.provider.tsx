import AppCtx from "./app-context";
import React, { useEffect, useReducer, useState } from "react";
import AppContextInterface from "./app-context.interface";
import { IStateAction } from "../interfaces/interfaces";
import axios from "axios";
import { fetchAllAction } from "../actions/itemActions";
import todosReducer from "../reducers/todos.reducer";

const defaultState = {
  user: {
    name: "Kipack Jeong",
  },
  todos: [],
  compTodos: [],
};

function AppContextProvider(props: any) {
  const children = props.children;

  const [state, dispatch] = useReducer(todosReducer, defaultState);
  console.log("AppContext: " + JSON.stringify(state));

  return (
    <AppCtx.Provider value={{ state, dispatch }}>{children}</AppCtx.Provider>
  );
}

export default AppContextProvider;
