import { useReducer } from "react";
import counterReducerTutor, { counterDefaultTutor } from "./../reducers/counterTutor";
import authReducerTutor, { authDefaultTutor } from "./../reducers/authTutor";

const useCombinedReducersTutor = () => {
  const [counterStoreTutor, counterTutor] = useReducer(counterReducerTutor, counterDefaultTutor);
  const [authStoreTutor, authTutor] = useReducer(authReducerTutor, authDefaultTutor);

  return {
    store: { ...counterStoreTutor, ...authStoreTutor },
    reducers: [counterTutor, authTutor]
  };
};

export default useCombinedReducersTutor;
