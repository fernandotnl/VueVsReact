import Vue from 'vue';
import Vuex from 'vuex';

import stocks from './modules/stocks';
import portfolio from './modules/portfolio';

const actions = {
	loadData: ({commit}) => {
	    Vue.http.get('data.json')
	        .then(response => {
	        	let data = response.body;
	       	    if (data) {
	                const stocks = data.stocks;
	                const funds = data.funds;
	                const stockPortfolio = data.stockPortfolio;

	                const portfolio = {
	                    stockPortfolio,
	                    funds
	                };

	                commit('SET_STOCKS', stocks);
	                commit('SET_PORTFOLIO', portfolio);
	            }
	        });
	},
	resetData:({dispatch, commit}) => {
	    dispatch('initStocks');
	    dispatch('initPortfolio');
	}
}

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    modules: {
        stocks,
        portfolio
    }
});