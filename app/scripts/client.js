import '../styles/main.scss'
import React from 'react'
import { render } from 'react-dom'

import App from './components/App'
import configStore from './config/store'

let initialState = {
	energyUse: []
}

let store = configStore(initialState)

// const history = syncHistoryWithStore(browserHistory, store)

render(
  <App store={store}/>,
  document.getElementById('app')
);

// function handleNewHash() {
//   var location = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
//   render(
// 		<Provider store={store}>
// 	  	<App currentUrl={location} />
// 	  </Provider>,
// 	  document.getElementById('app')
// 	)
// }

// window.addEventListener('hashchange', handleNewHash, false);