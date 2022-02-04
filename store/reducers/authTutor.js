export const authDefaultTutor = {
  auth: {
    isLogged: false,
    user: {}
  }
};

export const LOGINTUTOR = "LOGINTUTOR";
export const LOGOUTTUTOR = "LOGOUTTUTOR";

const authReducerTutor = (state = authDefaultTutor, action) => {
  switch (action.type) {
    case LOGINTUTOR:
      return {
        auth: {
          ...state.auth,
          isLogged: true,
          user: action.payload
        }
      };
    case LOGOUTTUTOR:
      return {
        auth: {
          ...state.auth,
          isLogged: false,
          user: {}
        }
      };
    default:
      return state;
  }
};

export const loginActionTutor = user => {
  return {
    type: LOGINTUTOR,
    payload: user
  };
};

export const logoutActionTutor = () => {
  return {
    type: LOGOUTTUTOR
  };
};

export default authReducerTutor;
