import { Dispatch } from "react";
import { IState, IStateAction } from "../interfaces/interfaces";

interface AppContextInterface {
  state: IState;
  dispatch: Dispatch<IStateAction>;
}

export default AppContextInterface;
