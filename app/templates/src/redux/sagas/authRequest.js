import { put, call} from "redux-saga/effects";
import store from "store";
import { browserHistory } from "react-router";
import { DckActionTypes } from "dck-redux";

export const LOGIN = "LOGIN";
export const IS_USER_AUTHENTICATED = "IS_USER_AUTHENTICATED";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export function* makeAuthRequest(requestType, data) {
  const sessionData = store.get("sessionData");
  switch (requestType) {
    case LOGIN: {
       // user api call code
       const result = {
        code:200
       };
       return result;
    }
    case IS_USER_AUTHENTICATED: {
      console.log("session data=" + JSON.stringify(sessionData));
      const result = yield call(isUserAuthenticated, sessionData);

      if (result !== true) {
        yield call(browserHistory.push, "/sign-in");
      }
      return result;
    }
    default: {
      new Error("Unrecognized request:" + requestType);
    }
  }
}

function* isUserAuthenticated(sessionData) {
  if (
    sessionData !== undefined &&
    sessionData.access_token !== undefined &&
    sessionData.refresh_token !== undefined
  ) {
    if (
      process.env.NODE_ENV === "development" &&
      sessionData.access_token === "demoAccessToken" &&
      sessionData.refresh_token === "demoRefreshToken"
    ) {
      console.log("User development login");
      yield put({
        type: DckActionTypes.INITIALIZE_USER_SESSION,
        sessionData: sessionData,
        authenticated: true
      });
      return true;
    }

    const result = yield call(isAccessTokenValid, sessionData.access_token);

    if (result) {
      console.log("Access token is valid.");
      yield put({
        type: DckActionTypes.INITIALIZE_USER_SESSION,
        sessionData: sessionData,
        authenticated: true
      });
      return true;
    } else {
      const refreshTokenResult = yield call(
        refreshAccessToken,
        sessionData.refresh_token
      );

      if (
        refreshTokenResult !== undefined &&
        refreshTokenResult.access_token !== undefined &&
        refreshTokenResult.refresh_token !== undefined
      ) {
        console.log("Refresh token is valid.");
        yield put({
          type: DckActionTypes.INITIALIZE_USER_SESSION,
          sessionData: refreshTokenResult,
          authenticated: true
        });

        store.set("sessionData", refreshTokenResult);

        return true;
      }
    }
  }

  console.log("User not authenticated delete session data");

  yield put({
    type: DckActionTypes.INITIALIZE_USER_SESSION,
    sessionData: {},
    authenticated: false
  });

  store.set("sessionData", {});

  return false;
}

function* isAccessTokenValid(accessToken) {
  console.log("Check access token here:" + accessToken);

  if (accessToken !== undefined) {
    try {
      yield call(); // user api call code
      const result = false; 
      return result === true;
    } catch (error) {
      console.log("Error when check access token:" + error);
    }
  }
}

function* refreshAccessToken(refreshToken) {
  console.log("Refresh access token:" + refreshToken);

  if (refreshToken !== undefined) {
    try {
      yield call(); // user api call code
      const result = false; 
      if (result !== false) {
        const sessionData = {
          access_token: result.data.access_token,
          refresh_token: result.data.refresh_token
        };

        console.log("New session data:" + JSON.stringify(sessionData));

        return sessionData;
      }
    } catch (error) {
      console.log("Error when try to refresh access token:" + error);
    }
  }
}
