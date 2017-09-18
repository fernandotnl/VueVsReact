import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import * as reducers from 'reducers/index';
import * as stocksActions from 'actions/stocks/stocksActions';
import {bindActionCreators} from "redux";

import AppHeader from 'components/header/Header';
import Home from 'components/Home';
import Stocks from 'components/stocks/Stocks';
import Portfolio from 'components/portfolio/Porfolio';

import 'App.css';
const reducer = combineReducers(reducers);
const finalCreateStore = applyMiddleware(thunk)(createStore);
const store = finalCreateStore(reducer);

class App extends Component {
  componentDidMount(){
    const action = bindActionCreators(stocksActions, this.props.dispatch);
    action.initStocks();
  }
  render() {
    return (
      <Provider store={store}>
        {() => <div class="container">
          <AppHeader></AppHeader>
          <div class="row">
              <div class="col-xs-12">
                  <ReactCSSTransitionGroup
                    transitionName="slide"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                      <Router history={hashHistory}>
                          <Route path="/" component={Home}/>
                          <Route path="/portfolio" component={Portfolio}/>
                          <Route path="/stocks" component={Stocks}/>
                      </Router>
                  </ReactCSSTransitionGroup>
              </div>
          </div>
        </div>}
      </Provider>
    );
  }
}

export default App;
