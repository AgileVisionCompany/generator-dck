import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class RemovalDialog extends Component {
  renderItems() {
    return (
      <ul>{this.props.items.map((x, index) => <li key={index}>{x}</li>)}</ul>
    );
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{this.props.title}</h4>
          <p>
            Are you sure you want to remove selected items? This operation
            cannot be undone!
          </p>
          {this.renderItems()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close}>Cancel</Button>
          <Button bsStyle="danger" onClick={this.props.confirmRemoval}>
            Remove selected items
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RemovalDialog;
