import React from 'react';
import { Router } from '../react-router';
import { createBrowserHistory } from '../history';

export default (props) => {
  const history = createBrowserHistory(props);
  return (
    <Router children={props.children} history={history} />
  )
}
