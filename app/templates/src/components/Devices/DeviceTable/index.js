import React, { Component } from "react";
import { Grid, Row, Col, Button, ButtonToolbar } from "react-bootstrap";
import { BootstrapTable } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import "./styles.css";

import RemovalDialog from "../../RemovalDialog";

class DeviceTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRemoveModal: false,
      itemSelected: false,
      selectedRow: { id: null },
      selectRowProp: {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: true,
        bgColor: "#337ab7",
        onSelect: (row, isSelected, e) => this.onRowSelect(row, isSelected, e)
      }
    };
  }

  onRowSelect(row, isSelected, e) {
    if (isSelected === true) {
      this.setState({
        selectedRow: row
      });
      this.props.selectedHandler(row.id);
    }
    this.setState({ itemSelected: isSelected });
    if (e.target.cellIndex == 0) {
      this.props.editHandler(row.id);
    }
  }

  getSelectedItems() {
    let itemsArray = [];
    itemsArray.push(this.state.selectedRow);
    return itemsArray;
  }

  closeRemoveModal() {
    this.setState({ showRemoveModal: false });
  }

  showRemoveDialog() {
    this.setState({ showRemoveModal: true });
  }

  confirmRemoval() {
    const ids = this.getSelectedItems().map(x => x.id);
    this.props.onConfirmRemoval(ids);
    this.closeRemoveModal();
    this.setState({ selected: {} });
  }

  getItemsToRemove() {
    return this.getSelectedItems().map(item =>
      this.props.renderItemToRemove(item)
    );
  }

  editClicked() {
    const ids = this.getSelectedItems().map(x => x.id);
    this.props.editHandler(ids);
  }

  renderContent() {
    return (
      <Col md={12}>
        <BootstrapTable
          data={this.props.items}
          striped={true}
          hover={true}
          condensed
          pagination
          selectRow={this.state.selectRowProp}
          trClassName="tr-bootstrap-table"
        >
          {this.props.children}
        </BootstrapTable>
        <br />
        <ButtonToolbar className="tableToolbar">
          <Button bsStyle="primary" onClick={this.props.addNewHandler}>
            {this.props.addNewLabel}
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => this.showRemoveDialog()}
            disabled={!this.state.itemSelected}
          >
            Remove selected
          </Button>
        </ButtonToolbar>
        <RemovalDialog
          items={this.getItemsToRemove()}
          title="Remove device?"
          show={this.state.showRemoveModal}
          close={() => this.closeRemoveModal()}
          confirmRemoval={() => this.confirmRemoval()}
        />
      </Col>
    );
  }

  render() {
    return (
      <Grid bsClass="container-fluid">
        <Row>
          {this.props.loading ? (
            <Col md={12}>Loading...</Col>
          ) : (
            this.renderContent()
          )}
        </Row>
      </Grid>
    );
  }
}

export default DeviceTable;
