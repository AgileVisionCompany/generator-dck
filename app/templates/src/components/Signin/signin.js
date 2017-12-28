import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Grid, Row, Col, Button, Alert } from "react-bootstrap";

import "./signin.css";
import FieldGroup from "../FieldGroup";
import { email, requiredValue } from "dck-validators";
import { initField } from "../../lib/form-builder";
import { DckSelectors, DckActionCreators, DckActionTypes } from "dck-redux";

import Spinner from "react-spinkit";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initField(this, "email", "", email),
      ...initField(this, "password", "", requiredValue)
    };
  }

  valid() {
    return !!(
      this.state.email.validation &&
      this.state.email.validation.valid &&
      this.state.password.validation &&
      this.state.password.validation.valid
    );
  }

  signInClick() {
    if (this.valid()) {
      this.props.signIn(this.state.email.value, this.state.password.value);
    }
  }

  componentDidMount() {
    this.props.asyncProcessReset(DckActionTypes.SIGN_IN);
  }

  render() {
    return (
      <Grid bsClass="signin-container container-fluid">
        <Row bsClass="signin-content row">
          <Col md={12} bsClass="signin-content col">
            <div className="signin-form-container">
              <form className="signin-form">
                <img className="logo" />
                <div className="welcome">
                  <h1>Test dashboard</h1>
                  <h5>Please use test credentials:</h5>
                  <h5>email: demo@example.com</h5>
                  <h5>password: secret</h5>
                </div>
                <FieldGroup
                  id="email"
                  type="email"
                  label="Email address"
                  placeholder="Enter email"
                  value={this.state.email.value}
                  onChange={this.state.email.onChange}
                  validationState={this.state.email.validation}
                  validationMessage="Please enter a valid email"
                />
                <FieldGroup
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  value={this.state.password.value}
                  onChange={this.state.password.onChange}
                  validationState={this.state.password.validation}
                  validationMessage="Please enter password"
                />
                <div className="text-center sign-in-button-container">
                  {this.props.signInProcessFailed && (
                    <Alert bsStyle="warning">
                      <strong>Failed to sign in!</strong> Please check your
                      credentials and try again.
                    </Alert>
                  )}
                  {!this.props.signInProcessRunning && (
                    <Button
                      bsStyle="primary"
                      onClick={() => this.signInClick()}
                    >
                      Sign in
                    </Button>
                  )}
                  {this.props.signInProcessRunning && (
                    <Spinner name="double-bounce" color="white" />
                  )}
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const mapping = {
    signInProcessRunning: DckSelectors.selectProcessRunning(
      state,
      DckActionTypes.SIGN_IN
    ),
    signInProcessFailed: DckSelectors.selectProcessFailed(
      state,
      DckActionTypes.SIGN_IN
    )
  };

  return mapping;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(DckActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
