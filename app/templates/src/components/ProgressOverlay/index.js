import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "react-spinkit";

import "./styles.css";

class ProgressOverlay extends Component {
    render() {
        return (
            <div
                className={`progress-overlay-wrapper ${this.props.visible
                    ? ""
                    : "hide"}`}
            >
                <div className="progress-overlay-container">
                    {this.props.children}
                    <div className="spinner-container">
                        <Spinner name="three-bounce" color="#3494a5" fadeIn="none" />
                    </div>
                </div>
            </div>
        );
    }
}

ProgressOverlay.propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.node
};

export default ProgressOverlay;
