import IReducer, {
  ITodo,
  IState,
  IStateAction,
} from "../interfaces/interfaces";
import { ItemActionType } from "../actions/itemActions";

let toDosReducer: IReducer<ITodo>;
toDosReducer = function (state: IState, action: IStateAction): IState {
  const newState = { ...state };
  switch (action.type) {
    case ItemActionType.FetchAll:
      newState.todos = [...state.todos, ...action.payload];
  }
  return newState;
};

export default toDosReducer;
