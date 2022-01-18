import AppCtx from "./app-context";
import React, { useEffect, useReducer } from "react";
import AppContextInterface from "./app-context.interface";
import { IState, IStateAction } from "../interfaces/interfaces";
import axios from "axios";
import { fetchAllAction } from "../actions/itemActions";

const appReducer = (state: IState, action: IStateAction): IState => {};

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

  const [state, dispatch] = useReducer(appReducer, defaultContext.state);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await axios.get("http://localhost:3000/items");
      dispatch(fetchAllAction(response.data.data));
    }
    fetchData();
  }, []);

  return (
    <AppCtx.Provider value={{ state, dispatch }}>{children}</AppCtx.Provider>
  );
}

export default AppContextProvider;
