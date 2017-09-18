import React, { Component } from 'react';
import Stock from './Stock';
import {bindActionCreators} from "redux";
import * as portfolioActions from "actions/portfolio/portfolioActions";

class Stock extends Component {
    getInitialState(){
        return {
          quantity: 0
        }
    }
    buttonEnabled(){
        return !insufficientQuantity() && this.state.quantity >=0;
    }
    insufficientQuantity(){
        return this.state.quantity > this.props.stock.quantity;
    }
    sellStock(){
        const order = {
            stockId: this.props.stock.id,
            stockPrice: this.props.stock.price,
            quantity: this.state.quantity
        };
        const action = bindActionCreators(stockActions, this.props.dispatch);
        action.sellStock(order);
        this.setState({quantity: 0});
    }
    render() {
        const quantityClass = "form-control" + (insufficientQuantity()? "danger": "");
        const buttonText = insufficientQuantity()? 'Not enough' : 'Sell';
        return (
          <div class="col-sm-6 col-md-4">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        { this.props.stock.name }
                        <small>(Price: { this.props.stock.price } | Quantity: { this.props.stock.quantity })</small>
                    </h3>
                </div>
                <div class="panel-body">
                    <div class="pull-left">
                        <input
                                type="text"
                                class={quantityClass}
                                placeholder="Quantity"
                                value={this.state.quantity}
                        >
                    </div>
                    <div class="pull-right">
                        <button
                                class="btn btn-success"
                                onClick={sellStock}
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
