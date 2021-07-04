import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Home from './Home';
import Header from './Header';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const Routing = () => {
    return(
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/game" component={App} />
        </Switch>
        {/* <Footer/> */}
      </Router>
    )
  }

  ReactDOM.render(
    <React.StrictMode>
      <Routing />
    </React.StrictMode>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
