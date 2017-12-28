import React, { Component } from "react";
import {
  Button,
  Alert,
  Row,
  Grid,
  ButtonToolbar,
  Col,
  Form
} from "react-bootstrap";
import { browserHistory } from "react-router";
import { initField } from "../../../lib/form-builder";
import { nonEmpty } from "dck-validators";
import FieldGroup from "../../FieldGroup";
import PropTypes from "prop-types";

class DeviceForm extends Component {
  constructor(props) {
    super(props);
    const isNew =
      this.props.device === null ||
      this.props.device === undefined ||
      this.props.device.id === undefined;

    if (isNew) {
      this.state = {
        ...initField(this, "name", "", nonEmpty),
        ...initField(this, "location", "", nonEmpty),
        isNew: isNew
      };
    } else {
      this.state = {
        ...initField(this, "name", this.props.device.name, nonEmpty),
        ...initField(this, "location", this.props.device.location, nonEmpty),
        isNew: isNew
      };
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.state.name.validationCurrentValue();
      this.state.location.validationCurrentValue();
    }
  }

  valid() {
    return (
      this.state.name.validation &&
      this.state.name.validation.valid &&
      this.state.location.validation &&
      this.state.location.validation.valid 
    );
  }

  saveClicked() {
    if (this.valid()) {
      this.props.onSaveClicked({
        id: this.props.device != null ? this.props.device.id : null,
        name: this.state.name.value,
        location: this.state.location.value
      });
    }
  }

  render() {
    return (
      <Grid bsClass="container-fluid">
        <Row>
          <Col md={6} xs={12}>
            <div className="item-form">
              <Form>
                <FieldGroup
                  id="name"
                  type="text"
                  label="Name"
                  placeholder="Enter name"
                  value={this.state.name.value}
                  onChange={this.state.name.onChange}
                  validationState={this.state.name.validation}
                  validationMessage="Please enter a valid name"
                />
                <FieldGroup
                  id="location"
                  type="text"
                  label="Device Location"
                  placeholder="Enter location"
                  value={this.state.location.value}
                  onChange={this.state.location.onChange}
                  validationState={this.state.location.validation}
                  validationMessage="Please enter a valid location"
                />
              </Form>
            </div>
            {this.props.failed && (
              <Alert bsStyle="warning" bsClass="external-page-alert alert">
                <strong>Operation failed!</strong>
                <br />
                {this.props.message}
              </Alert>
            )}
            <ButtonToolbar>
              <Button
                bsStyle="primary"
                onClick={() => this.saveClicked()}
                disabled={!this.valid()}
              >
                {this.state.isNew ? "Create new device" : "Save device"}
              </Button>
              <Button onClick={() => browserHistory.push("/devices")}>
                Return
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Grid>
    );
  }
}

DeviceForm.propTypes = {
  onSaveClicked: PropTypes.func.isRequired
};

export default DeviceForm;
