import { useContext, createContext } from "react";
import { authDefaultTutor } from "../reducers/authTutor";
import { counterDefaultTutor } from "../reducers/counterTutor";

export const defaultStoreTutor = {
  store: { ...authDefaultTutor, ...counterDefaultTutor },
  dispatch: () => {}
};

export const StoreContextTutor = createContext(defaultStoreTutor);
export default () => {
  return useContext(StoreContextTutor);
};
