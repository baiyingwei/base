import React from "react";
import { __RouterContext as RouterContext } from "../react-router";
import {
  resolveToLocation,
  normalizeToLocation
} from "./utils/locationUtils.js";


function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

const LinkAnchor = (initProps) => {
  const { innerRef, // TODO: deprecate
    navigate,
    onClick,
    ...rest } = initProps;
  const { target } = rest;

  let props = {
    ...rest,
    onClick: event => {
      try {
        if (onClick) onClick(event);
      } catch (ex) {
        event.preventDefault();
        throw ex;
      }
      
      if (
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // ignore everything but left clicks
        (!target || target === "_self") && // let browser handle "target=_blank" etc.
        !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault();
        navigate();
      }
    }
  };

  return <a {...props} />;
}


const Link = (props) => {
  const { component = LinkAnchor,
    replace,
    to,
    innerRef, // TODO: deprecate
    ...rest } = props;
  return (
    <RouterContext.Consumer>
      {context => {
        const { history } = context;
        const location = normalizeToLocation(
          resolveToLocation(to, context.location),
          context.location
        );
        const href = location ? history.createHref(location) : "";
        const props = {
          ...rest,
          href,
          navigate() {
            const location = resolveToLocation(to, context.location);
            const method = replace ? history.replace : history.push;
            method(location);
          }
        };

        return React.createElement(component, props);
      }}
    </RouterContext.Consumer>
  )
}

export default Link;
