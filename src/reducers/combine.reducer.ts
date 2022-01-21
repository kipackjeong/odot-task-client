import IReducer from "../interfaces/interfaces";
import { IStateAction } from "../interfaces/interfaces";
import todosReducer from "./todos.reducer";
let combinedReducer: IReducer;
combinedReducer = function (state, action: IStateAction) {
  return {
    todos: todosReducer(state.todos, action),
  };
};

export default combinedReducer;
