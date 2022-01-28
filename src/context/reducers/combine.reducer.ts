import { IReducer, IStateAction } from "interfaces/interfaces";
import todosReducer from "./todos.reducer";
let combinedReducer: IReducer;
combinedReducer = function (state, action: IStateAction) {
  return todosReducer(state, action);
};

export default combinedReducer;
