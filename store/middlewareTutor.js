import { LOGOUTTUTOR } from "./reducers/authTutor";
import { resetActionTutor } from "./reducers/counterTutor";

export default action => dispatch => {
  if (action.type === LOGOUTTUTOR) {
    dispatch(resetActionTutor());
  }

  dispatch(action);
};
