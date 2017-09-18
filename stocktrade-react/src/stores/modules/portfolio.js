
import {observable, computed, action} from 'mobx';

class PortfolioStore {

    @observable funds;
    @observable stocks;

    constructor(rootStore){
        this.rootStore = rootStore;
    }
    @action buyStock = (stock) => {
        let record = this.stocks.find(element => element.id == stock.stockId);
        if (record) {
            record.quantity += quantity;
        } else {
            this.stocks.push({
                id: stock.stockId,
                quantity: stock.quantity
            });
        }
        this.funds -= stock.stockPrice * stock.quantity;
    }
    @action sellStock = (stock) => {
        const record = this.stocks.find(element => element.id == stock.stockId);
        if (record.quantity > stock.quantity) {
            record.quantity -= stock.quantity;
        } else {
            this.stocks.push({
                id: stock.stockId,
                quantity: stock.quantity
            })
        }
        this.funds += stock.stockPrice * stock.quantity;
    }
    @action setPortfolio = (portfolio) => {
        this.funds = portfolio.funds;
        this.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
    }

    @action stockPortfolio = (stocks) => {
        let newStocks = this.stocks.map(stock => {
            const record = stocks.find(element => element.id == stock.id);
            return {
                id: stock.id,
                quantity: stock.quantity,
                name: record.name,
                price: record.price
            }
        });
        return newStocks;
    }
    @action initPortfolio = () => {
        this.funds = 10000;
        this.stocks = [];
    }
    

}

export default PortfolioStore;