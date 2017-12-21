import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { createDckReducer } from "dck-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(initialState) {
  return createStore(
    combineReducers({
      dck: createDckReducer(
        ["USER"],
        ["SIGN_IN", "SIGN_UP", "LOGOUT", "RESET_USER_PASSWORD"]
      )
    }),
    initialState,
    composeEnhancers()
  );
}

const store = configureStore({});

export default store;
