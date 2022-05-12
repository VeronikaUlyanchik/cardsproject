import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import store from "./bll-redux/store";
import {HashRouter} from "react-router-dom";
import {GlobalStyle} from "./common/global-styles/CommonStyles.style";

const root = createRoot(
    document.getElementById('root') as HTMLElement);

root.render(
    // <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <GlobalStyle/>
                <App/>
            </Provider>
        </HashRouter>
    // </React.StrictMode>
);

reportWebVitals();
