import { Dispatch } from "react";
import { IStateAction, ITodoState } from "interfaces/interfaces";

interface AppContextInterface {
  state: ITodoState;
  dispatch: Dispatch<IStateAction>;
}

export default AppContextInterface;
