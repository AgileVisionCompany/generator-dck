import React, { Component } from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";

class SelectMenu extends Component {

  render() {
    return (
        <DropdownButton bsStyle="default" title={this.props.id} noCaret className="dropdown-no-caret">
        <MenuItem eventKey="1">Edit</MenuItem>
        <MenuItem eventKey="2">Remove</MenuItem>
        </DropdownButton>
    );
  }
}

export default SelectMenu;
