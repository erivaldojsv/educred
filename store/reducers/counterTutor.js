export const counterDefaultTutor = {
  counter: 0
};

export const INCREMENTTUTOR = "INCREMENTTUTOR";
export const DECREMENTTUTOR = "DECREMENTTUTOR";
export const RESETTUTOR = "RESETTUTOR";

const counterReducerTutor = (state = counterDefaultTutor, action) => {
  switch (action.type) {
    case INCREMENTTUTOR:
      return {
        ...state,
        counter: state.counter + 1
      };
    case DECREMENTTUTOR:
      return {
        ...state,
        counter: state.counter - 1
      };
    case RESETTUTOR:
      return {
        counter: 0
      };
    default:
      return state;
  }
};

export const incrementActionTutor = () => {
  return {
    type: INCREMENTTUTOR
  };
};

export const decrementActionTutor = () => {
  return {
    type: DECREMENTTUTOR
  };
};

export const resetActionTutor = () => {
  return {
    type: RESETTUTOR
  };
};

export default counterReducerTutor;
