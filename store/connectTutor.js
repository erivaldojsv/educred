import React from "react";
import { StoreContextTutor } from "./hooks/useStoreTutor";

const returnPropsAsDefaultTutor = (store, props) => props;

const ConnectTutor = (mapStateToProps = returnPropsAsDefaultTutor) => Component => {
  return function WrapConnectTutor(props) {
    return (
      <StoreContextTutor.Consumer>
        {({ dispatch, store }) => {
          const storePropsTutor = mapStateToProps(store, props);
          return <Component {...storePropsTutor} dispatch={dispatch} />;
        }}
      </StoreContextTutor.Consumer>
    );
  };
};

export default ConnectTutor;
