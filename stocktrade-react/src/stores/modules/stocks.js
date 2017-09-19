import dataStocks from '../../data/stocks';

import {observable, computed, action} from 'mobx';

class StocksStore {

    @observable stocks = [];

    constructor(rootStore){
        this.rootStore = rootStore;
    }
    @action initStocks = () => {
        this.stocks = dataStocks;
    }

    @action setStocks = (stocks) => {
        this.stocks = stocks;
    }

    @action loadData = (stock) => {
        this.stocks = stocks;
    }

    @action randomizeStocks = () => {
        this.stocks.forEach(stock => {
            stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
        });
    }
}

export default StocksStore;