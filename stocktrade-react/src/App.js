import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {observer, inject} from "mobx-react";
import {computed} from "mobx";
import AppHeader from "./components/header/Header";
import Home from "./components/Home";
import Stocks from "./components/stocks/Stocks";
import Portfolio from "./components/portfolio/Portfolio";

import './App.css';

@inject("stores") @observer
class App extends Component {
  constructor(props){
    super(props);
  }
  @computed get key(){
    return this.props.stores.currentView;
  }
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <AppHeader></AppHeader>
          <div className="row">
            <div className="col-xs-12">
              <CSSTransitionGroup
                transitionName="slide"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                <Switch key={this.key} >
                      <Route key="Home" exact path="/" component={Home}/>
                      <Route key="Portfolio" path="/portfolio" component={Portfolio}/>
                      <Route key="Stocks" path="/stocks" component={Stocks}/>
                </Switch>
              </CSSTransitionGroup>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
