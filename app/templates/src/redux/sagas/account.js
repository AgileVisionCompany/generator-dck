import { takeEvery, all, put, call } from "redux-saga/effects";
import { browserHistory } from "react-router";
import { DckActionTypes, DckActionCreators } from "dck-redux";
import * as authRequest from "./authRequest";
import {delay} from 'redux-saga';
import store from "store";

function* signInSaga(action) {
  yield put(DckActionCreators.asyncProcessStart(DckActionTypes.SIGN_IN));

  let sessionData;
  let authenticated;

  if (
    process.env.NODE_ENV === "development" &&
    action.email === "demo@example.com" &&
    action.password === "secret"
  ) {
    sessionData = {
      access_token: "demoAccessToken",
      refresh_token: "demoRefreshToken"
    };
    store.set("mocked_data", {
      devices: [
        {
          id: "1",
          name: "Example #1",
          location: "Bedroom"
        },
        {
          id: "2",
          name: "Example #2",
          location: "Kitchen"
        },
        {
          id: "3",
          name: "Example #3",
          location: "Restroom"
        }
      ]
    });
    authenticated = true;
  } else {
    try {
      const result = yield call(
        authRequest.makeAuthRequest,
        authRequest.LOGIN,
        {
          email: action.email,
          password: action.password
        }
      );

      const accessToken = result.access_token;
      const refreshToken = result.refresh_token;

      if (
        refreshToken != null
      ) {
        sessionData = {
          access_token: accessToken,
          refresh_token: refreshToken
        };
        authenticated = true;
      } else {
        console.log("User doesn't have enough permission to access to Dashboard");
        authenticated = false;
      }
    } catch (error) {
      console.log("Error when make login request:" + error);
      authenticated = false;
    }
  }

  console.log("result=" + authenticated);
  yield delay(3000);
  yield put({
    type: DckActionTypes.ASYNC_PROCESS_STOP,
    processCode: DckActionTypes.SIGN_IN,
    result: { success: authenticated }
  });

  if (authenticated === true) {
    yield put({
      type: DckActionTypes.INITIALIZE_USER_SESSION,
      sessionData: sessionData,
      authenticated: authenticated
    });
    store.set("sessionData", sessionData);
    yield call(browserHistory.push, "/");
  }
}

function* checkAuthenticatedSaga() {
  yield put({
    type: DckActionTypes.ASYNC_PROCESS_START,
    processCode: DckActionTypes.CHECK_AUTHENTICATED
  });

  const result = yield call(
    authRequest.makeAuthRequest,
    authRequest.IS_USER_AUTHENTICATED
  );
  if(result){
    yield call(browserHistory.push, "/home");
  }
  yield put({
    type: DckActionTypes.ASYNC_PROCESS_STOP,
    processCode: DckActionTypes.CHECK_AUTHENTICATED,
    result: { success: result }
  });
}


function* signOut() {
  console.log("User sign-out, delete user session");
  yield put(DckActionCreators.initializeUserSession({}, false));
  store.set("sessionData", {});
  yield call(browserHistory.push, "/sign-in");
}

function* accountSaga() {
  yield all([
    takeEvery(DckActionTypes.SIGN_IN, signInSaga),
    takeEvery(DckActionTypes.CHECK_AUTHENTICATED, checkAuthenticatedSaga),
    takeEvery(DckActionTypes.SIGN_OUT, signOut)
  ]);
}

export default accountSaga;
