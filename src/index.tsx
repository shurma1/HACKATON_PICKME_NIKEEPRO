import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {Provider} from "react-redux";
import {store} from "./store";
import Main from "@/Pages/Main/Main";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
        <Provider store={store}>
			<Main/>
        </Provider>
);