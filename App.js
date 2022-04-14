import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/Redux/Store';
import Route from './src/Route';
import './src/Constant/IMLocalize';

export default function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}
