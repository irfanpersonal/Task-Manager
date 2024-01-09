import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './store';
import {Provider} from 'react-redux';

const rootElement = document.querySelector('#root') as HTMLDivElement;
const root: ReactDOM.Root = ReactDOM.createRoot(rootElement);

root.render(
	<Provider store={store}>
		<App/>
		<ToastContainer position="top-center"/>
	</Provider>
);