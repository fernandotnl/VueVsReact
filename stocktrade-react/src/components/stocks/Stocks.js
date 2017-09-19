import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { computed } from 'mobx';
import Stock from './Stock';

@inject("stores") @observer
class Stocks extends Component {

  componentWillMount(){
    this.props.stores.setCurrentView("Stocks");
  }
  @computed get stocks(){
    return this.props.stores.stocksStore.stocks;
  }
  render() {
    var rows = [];
    if(this.stocks){
      for (var i=0; i < this.stocks.length; i++) {
          rows.push(<Stock key={i} stock={this.stocks[i]}/>);
      }
    }
    else{
      rows = "No Stocks";
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default Stocks;
