const initialState = {
    funds: 10000,
    stocks: []
};

export default function stocksReducer(state = initialState, action) {
  switch (action.type) {
    case "BUY_STOCK":
      let newState = {...state};
      const record = newState.stocks.find(element => element.id == action.order.stockId);
      if (record) {
            record.quantity += action.order.quantity;
      } else {
            newState.stocks.push({
                id: action.order.stockId,
                quantity: action.order.quantity
          });
      }
      newState.funds -= action.order.stockPrice * action.order.quantity;
      return newState;
    case "SELL_STOCK":
        let newState = {...state};
    	  const record = newState.stocks.find(element => element.id == action.order.stockId);
        if (record.quantity > action.order.quantity) {
            record.quantity -= action.order.quantity;
        } else {
            newState.stocks.splice(newState.stocks.indexOf(record), 1);
        }
        newState.funds += action.order.stockPrice * action.order.quantity;
      	return newState;
    case "SET_PORTFOLIO":
        let newState = {...state};
        newState.funds = action.portfolio.funds;
        newState.stocks = action.portfolio.stockPortfolio ? action.portfolio.stockPortfolio : [];
        return newState;
    default:
      	return state;
  }
}