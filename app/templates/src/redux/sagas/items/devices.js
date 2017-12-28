import { takeEvery, all, put, call } from "redux-saga/effects";
import { DckActionTypes } from "dck-redux";

import ProcessTypes from "../../processes/types";
import * as ItemTypes from "../../items/types";
import { browserHistory } from "react-router";
import store from "store";
import {delay} from 'redux-saga';

function* loadDevicesSaga() {
  
  yield put({
    type: DckActionTypes.ASYNC_PROCESS_START,
    processCode: ProcessTypes.DEVICES_LOAD
  });
  console.log("Load devices list requst");
  const mockedDevices = store.get("mocked_data").devices;

  const sessionData = store.get("sessionData");

  let processResult;

  try {
    if (
      process.env.NODE_ENV === "development" &&
      sessionData.access_token === "demoAccessToken"
    ) {
      yield put({
        type: DckActionTypes.ITEMS_SET,
        itemType: ItemTypes.Device,
        data: mockedDevices
      });
    } else {
        // user api call code
    }
    processResult = { success: true, message: null };
  } catch (error) {
    console.log("Error when try to make getDevices request:" + error);
    yield put({
      type: DckActionTypes.ITEMS_SET,
      itemType: ItemTypes.Device,
      data: []
    });
    processResult = { success: false, message: error };
  }
  yield delay(2000);
  yield put({
    type: DckActionTypes.ASYNC_PROCESS_STOP,
    processCode: ProcessTypes.DEVICES_LOAD,
    result: processResult
  });
}

function* createDeviceSaga(action) {
  const sessionData = store.get("sessionData");
  yield put({
    type: DckActionTypes.ASYNC_PROCESS_START,
    processCode: ProcessTypes.DEVICES_ADD
  });
  const deviceList = store.get("mocked_data").devices;
  console.log("crete device request:" + JSON.stringify(action.data));
  let processResult;
  if (
    process.env.NODE_ENV === "development" &&
    sessionData.access_token === "demoAccessToken"
  ){
    deviceList.push({
      id: (deviceList.length+1).toString(),
      name: action.data.name,
      location: action.data.location
    });
    store.set("mocked_data", {
      devices: deviceList
    });
    console.log("Device was created successfully:" + JSON.stringify(action));
    processResult = { success: true, message: null };
    yield call(browserHistory.push, "/devices");
  }
  else{
  try {
    // user api call code
    console.log("Device was created successfully:" + JSON.stringify(action));
    processResult = { success: true, message: null };
    yield call(browserHistory.push, "/devices");
  } catch (error) {
    console.log("Error when try to add device:" + error);
    processResult = { success: false, message: error };
  }
  }
  yield delay(2000);
  yield put({
    type: DckActionTypes.ASYNC_PROCESS_STOP,
    processCode: ProcessTypes.DEVICES_ADD,
    result: processResult
  });
}

function* deleteDeviceSaga(action) {
  yield put({
    type: DckActionTypes.ASYNC_PROCESS_START,
    processCode: ProcessTypes.DEVICES_REMOVE
  });
  const sessionData = store.get("sessionData");
  const deviceList = store.get("mocked_data").devices;
  console.log("Delete device with id:" + action.id);
  let processResult;
  if (
    process.env.NODE_ENV === "development" &&
    sessionData.access_token === "demoAccessToken"
  ){
    store.set("mocked_data", {
      devices: deviceList.filter(device => { return device.id.toString()!==action.id.toString()})
    });
    console.log("Device was deleted successfully:" + JSON.stringify(action));
    yield put({
      type: DckActionTypes.ITEMS_LOAD,
      itemType: ItemTypes.Device
    });
    processResult = { success: true, message: null };
  }
  else{
  try {
   // user api call code
    console.log("Device was deleted successfully:" + JSON.stringify(action));
    yield put({
      type: DckActionTypes.ITEMS_LOAD,
      itemType: ItemTypes.Device
    });

    processResult = { success: true, message: null };
  } catch (error) {
    console.log("Error when try to delete device:" + error);
    processResult = { success: false, message: error };
  }
  }
  yield delay(2000);
  yield put({
    type: DckActionTypes.ASYNC_PROCESS_STOP,
    processCode: ProcessTypes.DEVICES_REMOVE,
    result: processResult
  });
}

function* updateDeviceSaga(action) {
  const sessionData = store.get("sessionData");
  const deviceList = store.get("mocked_data").devices;
  yield put({
    type: DckActionTypes.ASYNC_PROCESS_START,
    processCode: ProcessTypes.DEVICES_UPDATE
  });
  console.log("update device request:" + JSON.stringify(action.data));
  let processResult;
  if (
    process.env.NODE_ENV === "development" &&
    sessionData.access_token === "demoAccessToken"
  ){
    for(let i = 0; i < deviceList.length; i++){
        if(action.data.id===deviceList[i].id){
          const updatedDevice = {
            id: action.data.id,
            name: action.data.name,
            location: action.data.location
          }
          deviceList[i]=updatedDevice;
          break;
        }
    }
    store.set("mocked_data", {
      devices: deviceList
    });   
    processResult = { success: true, message: null };
    yield call(browserHistory.push, "/devices");
  }
  else{
  try {
   // user api call code
    processResult = { success: true, message: null };
    yield call(browserHistory.push, "/devices");
  } catch (error) {
    console.log("Error when try to update device:" + error);
    processResult = { success: false, message: error };
  }
}
yield delay(2000);
  yield put({
    type: DckActionTypes.ASYNC_PROCESS_STOP,
    processCode: ProcessTypes.DEVICES_UPDATE,
    result: processResult
  });
}

function* devicesSaga() {
  yield all([
    takeEvery(
      action =>
        action.type === DckActionTypes.ITEMS_LOAD &&
        action.itemType === ItemTypes.Device,
      loadDevicesSaga
    ),
    takeEvery(
      action =>
        action.type === DckActionTypes.ITEM_ADD &&
        action.itemType === ItemTypes.Device,
      createDeviceSaga
    ),
    takeEvery(
      action =>
        action.type === DckActionTypes.ITEM_REMOVE &&
        action.itemType === ItemTypes.Device,
      deleteDeviceSaga
    ),
    takeEvery(
      action =>
        action.type === DckActionTypes.ITEM_SAVE &&
        action.itemType === ItemTypes.Device,
      updateDeviceSaga
    )
  ]);
}

export default devicesSaga;
