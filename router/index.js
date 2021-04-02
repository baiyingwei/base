import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, Link } from './react-router-dom';
import Home from './home';
import Detail from './detail';

const DetailCom = (props) => {
  return (
    <div>
      <Link to={{ pathname: '/list/aaa' }}>aaa</Link>
      <br />
      <Link to={{ pathname: '/list/bbb' }}>bbb</Link>
      <Route path="/list/aaa" component={() => <div>aaa</div>}></Route>
      <Route path="/list/bbb" component={() => <div>bbb</div>}></Route>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/detail" component={Detail} exact></Route>
        <Route path="/list" component={DetailCom}></Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}


ReactDOM.render(<App />, document.getElementById('app'));


