import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import Applcation from './App';
import 'antd/dist/antd.css';
import './index.less';
import Login from './Login';

import Admin from './Admin';

import Antdtable from './Antdtable';

import Header from './HeaderComp';
let routerMain;

function App(props) {
  props.callback && props.callback(); // callback coming from parent component - required to stop the Spinner
  return (<React.Fragment>
    <Header>

    </Header>

    <Router ref={(router) => {
      routerMain = router;
    }}>


      <Route path="/app" extact={true} render={(prps) => <div>
        <Applcation />
      </div>} />

      <Route path="/admin" extact={true} render={(prps) => <div>
        <Admin />
      </div>} />

      <Route path="/" exact={true} render={(prps) => <div>
        <Login {...prps} />
      </div>} />

    </Router>
  </React.Fragment>);
}


class WebApp extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    let content = document.createElement('div');
    content.id = 'my_content';
    this.appendChild(content);
    ReactDOM.render(<App callback={this['callback']} route={this['route']} />, content);
  }
}
window.customElements.define('my-element', WebApp);
