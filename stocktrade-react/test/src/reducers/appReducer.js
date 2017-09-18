import axios from "util/axios";

const initialState = 0;

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_DATA":
     axios.get('data.json')
        .then(response => response.json())
        .then(data => {
            if (data) {
                const stocks = data.stocks;
                const funds = data.funds;
                const stockPortfolio = data.stockPortfolio;

                const portfolio = {
                    stockPortfolio,
                    funds
                };
                action.asyncDispatch({ type:'SET_STOCKS', stocks: stocks});
                action.asyncDispatch({ type:'SET_PORTFOLIO', portfolio: portfolio});
            }
        });
      return state;
    default:
      return state;
  }
}