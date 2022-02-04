import React from "react";
import PropTypes from "prop-types";
import useCombinedReducersTutor from "./hooks/useCombinedReducersTutor";
import { StoreContextTutor } from "./hooks/useStoreTutor";
import middlewareTutor from "./middlewareTutor";

const Provider = ({ children }) => {
  const { store, reducers } = useCombinedReducersTutor();

  const triggerDispatchsTutor = action => {
    for (let i = 0; i < reducers.length; i++) {
      reducers[i](action);
    }
  };

  const withMiddlewareTutor = action => {
    middlewareTutor(action)(triggerDispatchsTutor);
  };

  return (
    <StoreContextTutor.Provider
      value={{
        store,
        dispatch: withMiddlewareTutor
      }}
    >
      {children}
    </StoreContextTutor.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired
};

export default Provider;
