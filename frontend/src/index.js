import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './bootstrap.min.css'
import App from './App'
import RecommendSection from './screens/RecommendSection'

ReactDOM.render(
  <Provider store={store}>
    <App />
    {/* <RecommendSection/> */}
  </Provider>,
  document.getElementById('root')
)
