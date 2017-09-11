import React, {Component} from 'react'

import { Router, Route, Link, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, navigate } from 'react-router-redux'

import { Provider } from 'react-redux'

import HeaderSection from './header/header'
import EnergyUse from './charts/EnergyUse'

class App extends Component {


	render(){
		const { store } = this.props;

		const history = syncHistoryWithStore(browserHistory, store);

		const deployPath = "/";//"project-pals-proto";

		return <Provider store={store}>
			<div>
				<HeaderSection />
				
				<Router history={history}>
		      <Route path={deployPath} component={EnergyUse} />
		    </Router>				
		  </div>
		</Provider>
	}

}

export default App //connect(mapStateToProps, mapDispatchtoProps)(App)