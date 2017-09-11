import { combineReducers } from 'redux'
import energyUseReducer from './energyUse'
import svgReducer from './svg'

import { syncHistoryWithStore, routerReducer, navigate } from 'react-router-redux'

const rootReducer = combineReducers({
	energyUse: energyUseReducer,
	routing: routerReducer
})

export default rootReducer