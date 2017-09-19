import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { computed } from 'mobx';
import Stock from './Stock';

@inject("stores") @observer
class Portfolio extends Component {

  componentWillMount(){
    this.props.stores.setCurrentView("Portfolio");
  }

  @computed get stocks(){
    const stocks = this.props.stores.stocksStore.stocks;
    const stocksPortfolio = this.props.stores.portfolioStore.stocks;
    return stocksPortfolio.map(stock => {
          const record = stocks.find(element => element.id == stock.id);
          return {
              id: stock.id,
              quantity: stock.quantity,
              name: record.name,
              price: record.price
          }
    });
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
