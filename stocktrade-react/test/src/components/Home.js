import React, { Component } from 'react';
import {connect} from "react-redux";

@connect(state => ({
  funds: state.funds
}))
class Home extends Component {

  render() {
    return (
      <div>
        <h1>Trade or View your Portfolio</h1>
        <h6>You may Save And Load your Data</h6>
        <h6>Click on End Day to begin a New Day!</h6>
        <hr/>
        <p>Your Funds: { this.props.funds }</p>
      </div>
    );
  }
}

export default Home;
