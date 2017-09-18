import stocks from '../../data/stocks';

export function buyStock() {
	return {
    	type: "BUY_STOCK"
 	};
}

export function initStocks() {
	return {
    	type: "SET_STOCKS",
    	stocks: stocks
 	};
}

export function randomizeStocks(order) {
	return {
    	type: "RND_STOCKS",
    	order: order
 	};
}