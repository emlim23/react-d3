import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from '../reducers'
import promiseMiddleware from 'redux-promise'

import { routerMiddleware, push } from 'react-router-redux'
import { browserHistory } from 'react-router'

const middleware = routerMiddleware(browserHistory)

let finalCreateStore = compose(
	applyMiddleware(promiseMiddleware, middleware)
)(createStore)

export default function configStore(initialState = {energyUse: [] }){
	return finalCreateStore(rootReducer, initialState)
}

