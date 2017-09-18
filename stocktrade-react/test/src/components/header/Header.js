import React, { Component } from 'react';
import './Header.css';

import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as appActions from "actions/appActions";
import * as stocksActions from "actions/stocksActions";
import { Link } from 'react-router-dom'
import axios from 'util/axios';

@connect(state => ({
  funds: state.funds,
  stockPortfolio: state.stockPortfolio,
  stocks: state.stocks
}))
class Header extends Component {

  getInitialState(){
    return {
      isDropdownOpen: false
    }
  }
  changeDropdownOpen(){
    this.setState({
      isDropdownOpen : !this.state.isDropdownOpen
    });
  }
  render() {
    const funds = 100;
    const classDropDown = "dropdown "+ (this.state.isDropdownOpen? "open": "");
    return (
     <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <Link to="/" class="navbar-brand">Stock Trader</Link>
            </div>

            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <Link to="/portfolio" activeClass="active">Portfolio</Link>
                    <Link to="/stocks" activeClass="active">Portfolio</Link>
                </ul>
                <strong class="navbar-text navbar-right">Funds: { this.props.funds}</strong>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#" onClick={this.endDay}>End Day</a></li>
                    <li
                        class={classDropDown}
                        onClick={this.changeDropdownOpen}>
                        <a
                            href="#"
                            class="dropdown-toggle"
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false">Save & Load <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li>
                                <button onClick={this.saveData}>
                                  Save Data
                                </button>
                            </li>
                            <li>
                                <button onClick={this.loadData}>
                                  Load Data
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
  }
  endDay() {
      const action = bindActionCreators(stockActions, this.props.dispatch);
      action.randomizeStocks(this.props.stocks);
  }
  saveDate(){
    const data = {
        funds: this.props.funds,
        stockPortfolio: this.props.stockPortfolio,
        stocks: this.props.stocks
    };
    axios.put('data.json', data);
  }
  loadData(){
    const action = bindActionCreators(appActions, this.props.dispatch);
    action.loadData();
  }
}

export default Header;
