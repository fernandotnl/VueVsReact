import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';

import App from './App';
import mainStore from './stores/store';

ReactDOM.render(
	<Provider stores={mainStore}>
		<App />
	</Provider>
	, document.getElementById('app'));
