import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DckActionCreators, DckSelectors } from "dck-redux";

import * as ItemTypes from "../../../redux/items/types";
import ProcessTypes from "../../../redux/processes/types";
import DeviceForm from "../DeviceForm";

class AddDevice extends Component {
  render() {
    return (
      <div>
        <DeviceForm
          device={null}
          onSaveClicked={data => this.props.addDevice(data)}
          failed={this.props.deviceCreateFailed}
          message={
            this.props.deviceAddProcess != null &&
            this.props.deviceAddProcess.result != null
              ? this.props.deviceAddProcess.result.message
              : ""
          }
        />
      </div>
    );
  }
}

AddDevice.propTypes = {  
  addDevice: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const mapping = {
    deviceCreating: DckSelectors.selectProcessRunning(
      state,
      ProcessTypes.DEVICE_ADD
    ),
    deviceCreateFailed: DckSelectors.selectProcessFailed(
      state,
      ProcessTypes.DEVICE_ADD
    ),
    deviceAddProcess: DckSelectors.selectProcess(state, ProcessTypes.DEVICE_ADD)
  };

  return mapping;
};

const mapDispatchToProps = dispatch => {
  return {
    addDevice: data =>
      dispatch(DckActionCreators.itemAdd(ItemTypes.Device, data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDevice);
