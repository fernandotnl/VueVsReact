import React, { Component } from 'react';
import {computed, action, observable} from 'mobx';
import {observer,inject} from "mobx-react";
import stocksStore from "../../stores/modules/stocks";

@inject("stores") @observer
class Stock extends Component {

    @observable quantity = 0;

    constructor(props) {
        super(props);
        this.changeQuantity = ::this.changeQuantity;
        this.buyStock = ::this.buyStock;
    }
    @computed get funds(){
        return this.props.stores.portfolioStore.funds;
    }
    @computed get buttonDisabled(){
        return this.insufficientFunds || this.quantity <=0;
    }
    @computed get insufficientFunds(){
        return (this.quantity * this.props.stock.price) > this.funds;
    }
    @action changeQuantity = (event) => {
        this.quantity = event.target.value;
    }
    @action setQuantity = (quantity) => {
        this.quantity = quantity;
    }
    changeQuantity(event) {
        this.setQuantity(event.target.value);
    }
    buyStock(){
        const order = {
            stockId: this.props.stock.id,
            stockPrice: this.props.stock.price,
            quantity: this.quantity
        };
        this.props.stores.portfolioStore.buyStock(order);
        this.setQuantity(0);
    }
    render() {
        const { stock } = this.props;
        const quantityClass = "form-control" + (this.insufficientFunds? "danger": "");
        const buttonText = this.insufficientFunds? 'Insufficient Funds' : 'Buy';
        return (
          <div className="col-sm-6 col-md-4">
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3 className="panel-title">
                         {this.props.stock.name }
                        <small>(Price: { this.props.stock.price })</small>
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="pull-left">
                        <input
                                type="text"
                                className={quantityClass}
                                placeholder="Quantity"
                                onChange={this.changeQuantity}
                                value={this.quantity}
                        />
                    </div>
                    <div className="pull-right">
                        <button
                                className="btn btn-success"
                                onClick={this.buyStock}
                                disabled={this.buttonDisabled}
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
