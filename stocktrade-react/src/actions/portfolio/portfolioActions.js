export function sellStock(order) {
	return {
    	type: "SELL_STOCK",
    	order: order
 	};
}