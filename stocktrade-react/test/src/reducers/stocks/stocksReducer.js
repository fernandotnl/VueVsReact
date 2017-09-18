const initialState = {
    stocks: []
};

export default function stocksReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_STOCKS":
      return {...state,
    	         stocks: action.stocks
      };
    case "RND_STOCKS":
        let newState = {...state};
    	  newState.stocks.forEach(stock => {
            stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
        });
      	newState.stocks = action.stocks;
      	return newState;
    default:
      	return state;
  }
}