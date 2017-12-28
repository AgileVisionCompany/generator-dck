import React, { Component } from "react";
import store from "store";

class Home extends Component {
  getUserEmail() {
    const userToken = store.get("sessionData").access_token;
    if (userToken === "demoAccessToken") {
      return "demo@example.com";
    } else if (userToken !== null && userToken !== undefined) {
      // return email from token
    } else {
      return "Undefined user";
    }
  }

  render() {
    return (
      <article>
        <h1>Welcome!</h1>
        <h3>You are logined as user: {this.getUserEmail()}</h3>
      </article>
    );
  }
}

export default Home;
