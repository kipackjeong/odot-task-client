import { useReducer } from "react";
import todosReducer from "context/reducers/todos.reducer";
import AppCtx from "context/app-context";
import { ITodoState } from "interfaces/interfaces";

const defaultState: ITodoState = {
  listDate: new Date(Date.now()),
  inCompTodos: [],
  compTodos: [],
  updateWaitingList: []
};

const AppContextProvider = (props: any) => {
  const children = props.children;
  const [state, dispatch] = useReducer(todosReducer, defaultState);
  return (
    <AppCtx.Provider value={{ state: state, dispatch: dispatch }}>
      {" "}
      {children}{" "}
    </AppCtx.Provider>
  );
};

export default AppContextProvider;
