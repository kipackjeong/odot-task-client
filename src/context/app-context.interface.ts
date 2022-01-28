import { Dispatch } from "react";
import { IStateAction } from "interfaces/interfaces";

interface AppContextInterface {
  state: any;
  dispatch: Dispatch<IStateAction>;
}

export default AppContextInterface;
