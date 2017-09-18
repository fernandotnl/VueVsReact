import React, { Component } from 'react';
import Stock from './Stock';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as stocksActions from "actions/stocks/stocksActions";

@connect(state => ({
  funds: state.funds,
  stockPortfolio: state.stockPortfolio,
  stocks: state.stocks
}))
class Stock extends Component {
    getInitialState(){
        return {
          quantity: 0
        }
    }
    changeQuantity(event) {
        this.setState({quantity: event.target.value});
    }
    buttonEnabled(){
        return !insufficientQuantity() && this.state.quantity >=0;
    }
    insufficientFunds(){
        return this.state.quantity * this.props.stock.price > this.props.funds;
    }
    buyStock(){
        const order = {
            stockId: this.props.stock.id,
            stockPrice: this.props.stock.price,
            quantity: this.state.quantity
        };
        const action = bindActionCreators(stockActions, this.props.dispatch);
        action.buyStock(order);
        this.setState({quantity: 0});
    }
    render() {
        const quantityClass = "form-control" + (insufficientQuantity()? "danger": "");
        const buttonText = insufficientFunds()? 'Insufficient Funds' : 'Buy';
        return (
          <div class="col-sm-6 col-md-4">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3 class="panel-title">
                         {this.props.stock.name }
                        <small>(Price: { this.props.stock.price })</small>
                    </h3>
                </div>
                <div class="panel-body">
                    <div class="pull-left">
                        <input
                                type="text"
                                class={quantityClass}
                                placeholder="Quantity"
                                onChange={changeQuantity}
                                value={this.state.quantity}
                        />
                    </div>
                    <div class="pull-right">
                        <button
                                class="btn btn-success"
                                onClick={buyStock}
                                enabled={buttonEnabled}
                        >
                        {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Stock;
