import React, { useState, useEffect } from 'react';
import RouterContext from './RouterContext';

export default (props) => {
  const { history, children, staticContext } = props;
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    const unlisten = history.listen((location) => {
      setLocation(location);
    });
    return () => {
      if (unlisten) {
        unlisten();
      }
    }
  }, []);

  return (
    <RouterContext.Provider
      value={{
        history: history,
        location: location,
        match: {
          path: '/',
          url: '/',
          params: {},
          isExact: location.pathname === "/",
        },
        staticContext: staticContext
      }}
    >
      { children}
    </RouterContext.Provider >
  )
}