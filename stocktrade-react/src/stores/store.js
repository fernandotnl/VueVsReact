import {observable, computed, action} from 'mobx';
import PortfolioStore from '../stores/modules/portfolio';
import StocksStore from '../stores/modules/stocks';
import axios from '../util/axios';

class MainStore {

    @observable currentView;

    constructor() {
        this.stocksStore = new StocksStore(this);
        this.portfolioStore = new PortfolioStore(this);
    }
    @action loadData = () => {
       axios.get('data.json')
        .then(response => {
            let data = response.data;
            if (data) {
                const stocks = data.stocks;
                const funds = data.funds;
                const stockPortfolio = data.stockPortfolio;
                const portfolio = {
                    stockPortfolio: stockPortfolio,
                    funds: funds
                };
                this.stocksStore.setStocks(stocks);
                this.portfolioStore.setPortfolio(portfolio);
            }
        });
    }
    @action resetData = () => {
        this.stocksStore.initStocks();
        this.portfolioStore.initPortfolio();
    }
    @action setCurrentView = (view) => {
        this.currentView = view;
    }
}

const mainStore = new MainStore();

export default mainStore;
export { MainStore };