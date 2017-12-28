import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import SignIn from "./components/Signin/signin";

import Devices from "./components/Devices";
import ListDevices from "./components/Devices/List";
import EditDevices from "./components/Devices/EditDevice";
import AddDevices from "./components/Devices/AddDevice";

import NotFound from "./components/NotFound";
import Home from "./components/Home";

import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./redux/store";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Router,
  Route,
  IndexRedirect,
  IndexRoute,
  browserHistory
} from "react-router";
import { DckActionCreators } from "dck-redux";
import { syncHistoryWithStore } from "react-router-redux";
const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route
        path="/sign-in"
        component={SignIn}
        onEnter={() => store.dispatch(DckActionCreators.checkAuthenticated())}
      />
      <Route path="/" component={App}>
        <Route
          onEnter={() => store.dispatch(DckActionCreators.checkAuthenticated())}
        >
          <Route path="/home" component={Home} />
          <Route path="/devices" component={Devices}>
            <IndexRoute component={ListDevices} />
            <Route path=":id/edit" component={EditDevices} />
            <Route path="add" component={AddDevices} />
          </Route>
          <Route
            path="/sign-out"
            onEnter={() => store.dispatch(DckActionCreators.signOut())}
          />
          <Route path="*" component={NotFound} />
          <IndexRedirect to="/home" />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
