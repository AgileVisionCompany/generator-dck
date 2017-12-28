import React, { Component } from "react";
import { PageHeader } from "react-bootstrap";

class Devices extends Component {
  render() {
    return (
      <div>
        <PageHeader>Devices</PageHeader>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Devices;
