import React, { Component } from "react";
import { connect } from "react-redux";
import { TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import { Col } from "react-bootstrap";
import * as ItemTypes from "../../../redux/items/types";
import { DckSelectors, DckActionCreators } from "dck-redux";
import ProcessTypes from "../../../redux/processes/types";
import ProgressOverlay from "../../ProgressOverlay"

import DeviceTable from "../DeviceTable";

class ListDevices extends Component {
  renderItemToRemove(item) {
    return `${item.name}`;
  }

  selectedHandler(id) {
    this.props.setSelectedDevice(id);
  }

  render() {
    return (
      <Col md={12}>
          {this.props.devicesLoading &&  <ProgressOverlay visible={true}/>}
          {!this.props.devicesLoading &&
        <DeviceTable
          items={this.props.devices}
          onConfirmRemoval={ids => this.props.removeDevices(ids)}
          renderItemToRemove={item => this.renderItemToRemove(item)}
          addNewLabel="Create new device"
          addNewHandler={() =>
            this.props.router.push({ pathname: "/devices/add" })
          }
          editHandler={id =>
            this.props.router.push({ pathname: `/devices/${id}/edit` })
          }
          selectedHandler={id => this.selectedHandler(id)}
          editable={true}
        >
          <TableHeaderColumn
            dataField="id"
            isKey={true}
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 1000 }}
            width="150"
          >
            Id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="name"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 1000 }}
          >
            Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="location"
            dataAlign="center"
            dataSort={true}
            filter={{ type: "TextFilter", delay: 1000 }}
            width="150"
          >
            Location
          </TableHeaderColumn>
        </DeviceTable>}
      </Col>
    );
  }

  componentDidMount() {
    this.props.loadDevices();
    console.log("load devices");
  }
}

const mapStateToProps = state => {
  const mapping = {
    devices: DckSelectors.selectAllItems(state, ItemTypes.Device),
    devicesLoading: DckSelectors.selectProcessRunning(
      state,
      ProcessTypes.DEVICES_LOAD
    ),
    devicesLoadingFailed: DckSelectors.selectProcessFailed(
      state,
      ProcessTypes.DEVICES_LOAD
    ),
    devicesRemoving: DckSelectors.selectProcessRunning(
      state,
      ProcessTypes.DEVICES_REMOVE
    ),
    devicesRemovingFailed: DckSelectors.selectProcessFailed(
      state,
      ProcessTypes.DEVICES_REMOVE
    )
  };

  return mapping;
};

const mapDispatchToProps = dispatch => {
  return {
    loadDevices: () => dispatch(DckActionCreators.itemsLoad(ItemTypes.Device)),
    removeDevices: id =>
      dispatch(DckActionCreators.itemRemove(ItemTypes.Device, id)),
    setSelectedDevice: id =>
      dispatch(DckActionCreators.itemMakeActive(ItemTypes.Device, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDevices);
