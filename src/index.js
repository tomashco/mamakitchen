import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/database";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import configureStore from "./createStore";
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const fbConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

try {
  firebase.initializeApp(fbConfig);
} catch (err) {}

const store = configureStore();

const rrfProps = {
  firebase,
  config: {
    userProfile: "users",
    preserveOnLogout: ["kitchens"]
  },
  dispatch: store.dispatch
};

render(
  <BrowserRouter>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </BrowserRouter>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
