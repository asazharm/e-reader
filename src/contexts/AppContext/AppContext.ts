import { Context, Dispatch, createContext } from "react";
import { IAppState, TAppReducerAction } from "./AppContextProvider";

export interface IAppContext {
  state?: IAppState;
  dispatch: Dispatch<TAppReducerAction>;
}
const AppContext: Context<IAppContext> = createContext<IAppContext>(null!);

export default AppContext;
