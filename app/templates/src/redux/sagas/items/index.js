import { fork, all } from "redux-saga/effects";

import devicesSaga from "./devices";

function* rootSaga() {
  yield all([
    fork(devicesSaga)
  ]);
}

export default rootSaga;
