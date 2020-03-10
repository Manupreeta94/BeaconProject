/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from "react";
import configureStore from "./src/store/configureStore";
import { Provider } from "react-redux";
import RouterComponent from "./src/RouterComponent";

// const App = () => {
export default class App extends Component {
  // return (
  render() {
    return (
      <Provider store={configureStore}>
        <RouterComponent />
      </Provider>
    );
  }
}

