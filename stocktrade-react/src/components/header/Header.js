import React, { Component } from 'react';
import { NavLink, BrowserRouter } from 'react-router-dom'
import {observer, inject} from "mobx-react";
import {observable, computed, action} from "mobx";
import NumberFormat from 'react-number-format';

import axios from '../../util/axios';

@inject("stores") @observer
class Header extends Component {

  @observable isDropdownOpen = false;

  componentWillMount(){
    this.props.stores.loadData();
  }
  constructor(props) {
      super(props);
      this.changeDropdownOpen = ::this.changeDropdownOpen;
      this.clickLink = ::this.clickLink;
      this.endDay = ::this.endDay;
      this.saveData = ::this.saveData;
      this.loadData = ::this.loadData;
      this.resetData = ::this.resetData;
  }
  clickLink(event){
    event.preventDefault();
  }
  changeDropdownOpen(){
    this.setIsDropdownOpen(!this.isDropdownOpen);
  }
  endDay() {
    console.log(this.props);
      this.props.stores.randomizeStocks();
  }
  saveData(){
    const data = {
        funds: this.funds,
        stockPortfolio: this.props.stores.portfolioStore.stocks,
        stocks: this.props.stores.stocksStore.stocks
    };
    axios.put('data.json', data);
  }
  loadData(){
    this.props.stores.loadData(this.props);
  }
  resetData(){
    this.props.stores.resetData();
  }
  @action setIsDropdownOpen = (isDropdownOpen) => {
    this.isDropdownOpen = isDropdownOpen;
  }
  @computed get stocks(){
    return this.props.stores.stocksStore.stocks;
  }
  @computed get stockPortfolio(){
    return this.props.stores.portfolioStore.stocks;
  }
  @computed get funds(){
    return this.props.stores.portfolioStore.funds;
  }
  @computed get classDropDown(){
    return "dropdown "+ (this.isDropdownOpen? "open": "");
  }
  @computed get isHomeActive(){
    return this.props.stores.currentView == "Home" ? "navbar-brand router-link-exact-active router-link-active": "navbar-brand router-link-active";
  }
  @computed get isPortfolioActive(){
    return this.props.stores.currentView == "Portfolio"? "router-link-exact-active active": "";
  }
  @computed get isStocksActive(){
    return this.props.stores.currentView == "Stocks"? "router-link-exact-active active": "";
  }
  
  render() {
    return (
      <nav className="navbar navbar-default">
          <div className="container-fluid">
              <div className="navbar-header">
                <NavLink activeClassName={this.isHomeActive} to="/"> Stock Trader</NavLink>
              </div>
              <div className="collapse navbar-collapse">
                  <ul className="nav navbar-nav">
                    <li className={this.isPortfolioActive}>
                      <NavLink to="/portfolio"> Portfolio</NavLink>
                    </li>
                    <li className={this.isStocksActive}>
                      <NavLink to="/stocks" >Stocks</NavLink>
                    </li>
                  </ul>
                  <strong className="navbar-text navbar-right">
                      Funds:&nbsp;<NumberFormat value={ this.funds } displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </strong>
                  <ul className="nav navbar-nav navbar-right">
                      <li><a href="#" onClick={ this.endDay }>End Day</a></li>
                      <li
                          className={ this.classDropDown }
                          onClick={ this.changeDropdownOpen }>
                          <a
                              href="#"
                              className="dropdown-toggle"
                              data-toggle="dropdown"
                              role="button"
                              aria-haspopup="true"
                              aria-expanded="false">Save & Load <span className="caret"></span></a>
                          <ul className="dropdown-menu">
                              <li>
                                  <a onClick={ this.saveData }>
                                    Save Data
                                  </a>
                              </li>
                              <li>
                                  <a onClick={ this.loadData }>
                                    Load Data
                                  </a>
                              </li>
                              <li>
                                  <a onClick={ this.resetData }>
                                    Reset Data
                                  </a>
                              </li>
                          </ul>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
    );
  }
}

export default Header;
