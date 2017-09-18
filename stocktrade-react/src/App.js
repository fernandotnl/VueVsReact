import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {observer, inject} from "mobx-react";

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
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <AppHeader></AppHeader>
          <div className="row">
            <div className="col-xs-12">
              <CSSTransitionGroup
                transitionName="slide"
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={200}>
                  <div>
                    <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route path="/portfolio" component={Portfolio}/>
                      <Route path="/stocks" component={Stocks}/>
                    </Switch>
                  </div>
              </CSSTransitionGroup>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
