import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createDckReducer } from "dck-redux";
import rootSaga from "./sagas";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { browserHistory } from "react-router";
import * as ItemTypes from "./items/types";
import ProcessTypes from "./processes/types";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export function configureStore(initialState) {
  return createStore(
    combineReducers({
      dck: createDckReducer(
        ItemTypes, ProcessTypes
      ),
      routing: routerReducer
    }),
    initialState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory))
    )
  );
}

const store = configureStore({});
sagaMiddleware.run(rootSaga);

export default store;
