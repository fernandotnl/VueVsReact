import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "mobx-react";
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

import portfolioStore from './stores/modules/portfolio';
import stocksStore from './stores/modules/stocks';
import mainStore from './stores/store';

ReactDOM.render(
	<Provider stores={mainStore}>
		<App />
	</Provider>
	, document.getElementById('app'));
registerServiceWorker();
