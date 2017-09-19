import React, { Component } from 'react';
import {observer, inject} from "mobx-react";
import {observable, computed, action} from "mobx"; 
import portfolioStore from "../../stores/modules/portfolio";

import "./Stock.css";

@inject("stores") @observer
class Stock extends Component {
    
    @observable quantity = 0;

    constructor(props) {
        super(props);
        this.sellStock = ::this.sellStock;
        this.changeQuantity = ::this.changeQuantity;
    }
    
    @computed get insufficientQuantity(){
        return this.quantity > this.props.stock.quantity;
    }
    @computed get buttonDisabled(){
        return this.insufficientQuantity || this.quantity <=0;
    }
    @computed get quantityClass(){
        return "form-control " + (this.insufficientQuantity? "danger": "");
    }
    @computed get buttonText(){
        return this.insufficientQuantity? 'Not enough' : 'Sell';
    }
    @action setQuantity = (quantity) => {
        this.quantity = quantity;
    }
    changeQuantity(event) {
        console.log(event);
        this.setQuantity(event.target.value);
    }
    sellStock(){
        const order = {
            stockId: this.props.stock.id,
            stockPrice: this.props.stock.price,
            quantity: this.quantity
        };
        this.props.stores.portfolioStore.sellStock(order);
        this.setQuantity(0);
    }
    render() {
        const {stock} = this.props;
        return (
          <div className="col-sm-6 col-md-4">
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { this.props.stock.name }
                        <small>(Price: { this.props.stock.price } | Quantity: { this.props.stock.quantity })</small>
                    </h3>
                </div>
                <div className="panel-body">
                    <div className="pull-left">
                        <input
                                type="number" pattern="[0-9]*" inputMode="numeric"
                                className={this.quantityClass}
                                placeholder="Quantity"
                                onChange={this.changeQuantity}
                                value={this.quantity}
                        />
                    </div>
                    <div className="pull-right">
                        <button
                                className="btn btn-success"
                                onClick={this.sellStock}
                                disabled={this.buttonDisabled}
                        >
                        {this.buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Stock;
