import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.scss';

import { SnackbarProvider } from 'notistack';
import Firebase, { FirebaseContext } from './components/Firebase';

import App from './components/App';

ReactDOM.render(
    <SnackbarProvider maxsnack={3} >
        <FirebaseContext.Provider value={new Firebase()}>
            <App />
        </FirebaseContext.Provider>
    </SnackbarProvider>
    ,
    document.getElementById('root')
);

serviceWorker.unregister();
