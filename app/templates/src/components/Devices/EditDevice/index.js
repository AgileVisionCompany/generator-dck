import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DckSelectors, DckActionCreators } from "dck-redux";

import * as ItemTypes from "../../../redux/items/types";
import ProcessTypes from "../../../redux/processes/types";
import DeviceForm from "../DeviceForm";

class EditDevice extends Component {
  componentDidMount() {
    this.props.loadDevices();
  }

  render() {
    return (
      <div>
        {this.props.currentDevice ? (
          <DeviceForm
            id="editDeviceForm"
            device={this.props.currentDevice}
            onSaveClicked={data => this.saveDeviceClicked(data)}
            failed={
              this.props.deviceUpdatingFailed 
            }
            message={this.getMessage()}
          />
        ) : null}
      </div>
    );
  }

  getMessage() {
    if (
      this.props.deviceUpdatingProcess != null &&
      this.props.deviceUpdatingProcess.result != null
    ) {
      return this.props.deviceUpdatingProcess.result.message;
    }
    return null;
  }

  saveDeviceClicked(data) {
    this.props.saveDevice(this.props.currentDevice.id, data);
  }
}

EditDevice.propTypes = {
  saveDevice: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {;
  const mapping = {
    deviceUpdating: DckSelectors.selectProcessRunning(
      state,
      ProcessTypes.DEVICES_UPDATE
    ),
    deviceUpdatingFailed: DckSelectors.selectProcessFailed(
      state,
      ProcessTypes.DEVICES_UPDATE
    ),
    deviceUpdatingProcess: DckSelectors.selectProcess(
      state,
      ProcessTypes.DEVICES_UPDATE
    ),
    currentDevice: DckSelectors.selectItemById(
      state,
      ItemTypes.Device,
      ownProps.params.id
    )
  };

  return mapping;
};

const mapDispatchToProps = dispatch => {
  return {
    saveDevice: (id, data) => {
      dispatch(DckActionCreators.itemSave(ItemTypes.Device, id, data));
    },
    loadDevices: () => dispatch(DckActionCreators.itemsLoad(ItemTypes.Device))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDevice);
