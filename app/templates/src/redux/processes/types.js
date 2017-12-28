import * as itemTypes from "../items/types";
let processTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  CHECK_USER_SESSION: "CHECK_USER_SESSION",
  RESET_USER_PASSWORD: "RESET_USER_PASSWORD",
};
Object.keys(itemTypes).forEach(item => {
  processTypes[item] = {
    ADD: item + "_ADD",
    LOAD: item + "_LOAD",
    REMOVE: item + "_REMOVE",
    UPDATE: item + "_UPDATE"
  };
});
export default processTypes;
