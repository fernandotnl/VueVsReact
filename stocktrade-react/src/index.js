import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "mobx-react";

import portfolioStore from './stores/modules/portfolio';
import stocksStore from './stores/modules/stocks';
import mainStore from './stores/store';

import App from './App';

ReactDOM.render(
	<Provider stores={mainStore}>
		<App />
	</Provider>
	, document.getElementById('app'));
