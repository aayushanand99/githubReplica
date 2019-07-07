import React, { Component } from 'react';
import {SafeAreaView} from 'react-native'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/reducers';
import GithubReplica from './src/GithubReplica'
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise';

// const createStoreWithMiddleware = applyMiddleware(reduxPromise)(createStore);
const App = () => {
  const store = createStore(rootReducer, applyMiddleware( reduxPromise,thunk));
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
    <Provider store={store}>
      <GithubReplica />
    </Provider>
    </SafeAreaView>
  );
}

export default App;