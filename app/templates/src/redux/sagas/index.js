import { all, fork } from "redux-saga/effects";
import accountSaga from "./account";
import itemsSaga from "./items";

function* rootSaga() {
  yield all([fork(accountSaga), fork(itemsSaga)]);
}

export default rootSaga;
