import React, { Component } from 'react';
import Stock from './Stock';
import {inject, observer} from 'mobx-react';
import { computed } from 'mobx';

@inject("stores") @observer
class Portfolio extends Component {

  componentWillMount(){
    this.props.stores.setCurrentView("Portfolio");
  }
  @computed get stocks(){
    const stocks = this.props.stores.stocksStore.stocks;
    console.log(stocks);
    return this.props.stores.portfolioStore.stockPortfolio(stocks);
  }
  render() {
    var rows = [];
    if(this.stocks){
      for (var i=0; i < this.stocks.length; i++) {
          rows.push(<Stock key={i} stock={this.stocks[i]}/>);
      }
    }
    else{
      rows = "No portfolio";
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default Portfolio;
