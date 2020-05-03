import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native'
import React from 'react'
import App from './App'
import {name as appName} from './app.json'
// REDUX
import Store from './src/redux/store/Store'
import { Provider } from 'react-redux'

const Root = () => (
    <Provider store={Store}>
      <App />
    </Provider>
  )

AppRegistry.registerComponent(appName, () => Root)
