import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import "./styles.css";
import { Sidebar, SidebarItem } from "dck-react-components";

class App extends Component {
  _renderSidebarHeader() {
    return (
      <div className="sidebar-header">
        <h1 className="sidebar-header-title">DCK dashboard</h1>
      </div>
    );
  }

  render() {
    return (
      <Grid bsClass="container-fluid">
        <Row bsClass="app-container row">
          <Col md={2} xs={2} className="sidebar">
            <Sidebar headerComponent={this._renderSidebarHeader()}>
              <SidebarItem to="/home" icon="home">
                Home
              </SidebarItem>
              <SidebarItem to="/devices" icon="mobile">
                Devices
              </SidebarItem>
              <SidebarItem to="/sign-out" icon="sign-out">
                Sign out
              </SidebarItem>
            </Sidebar>
          </Col>
          <Col md={10} xs={10} bsClass="main-content col">
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
