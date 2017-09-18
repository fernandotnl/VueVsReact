import React, { Component } from 'react';
import Stock from './Stock';
import {connect} from "react-redux";

@connect(state => ({
  stocks: state.stocks
}))
class Stocks extends Component {

  render() {
    var rows = [];
    for (var i=0; i < this.props.stocks.length; i++) {
        rows.push(<Stock stock={this.props.stocks[i]}/>);
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default Stocks;
