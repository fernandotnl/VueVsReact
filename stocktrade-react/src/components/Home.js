import React, { Component } from 'react';
import {inject, observer} from "mobx-react";
import { computed } from 'mobx';
import NumberFormat from 'react-number-format';

@inject("stores") @observer
class Home extends Component {

  componentWillMount(){
    this.props.stores.setCurrentView("Home");
  }
  @computed get funds(){
    return this.props.stores.portfolioStore.funds;
  }
  render() {
    return (
      <div>
        <h1>Trade or View your Portfolio</h1>
        <h6>You may Save & Load your Data</h6>
        <h6>Click on 'End Day' to begin a New Day!</h6>
        <hr/>
        <p>Your Funds:&nbsp;<NumberFormat value={ this.funds } displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </p>
      </div>
    );
  }
}

export default Home;
