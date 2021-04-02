import React, { useEffect } from "react";
// import Lifecycle from "./Lifecycle.js";
import RouterContext from "./RouterContext.js";

const Lifecycle = (props) => {
  useEffect(() => {
    props.onMount && props.onMount();
  }, []);
  return null;
}
function Redirect({ to }) {
  return (
    <RouterContext.Consumer>
      {context => {
        const { history } = context;
        return (
          <Lifecycle
            onMount={() => {
              history.push(to);
            }}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}


export default Redirect;


