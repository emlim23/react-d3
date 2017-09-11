import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import energyUseActions from '../../actions/energyUseActions'

import EnergyUseChartSVG from './energyUseChartSVG'

class EnergyUseChart extends Component{
	constructor(props){
		super(props);
	}

	componentWillMount() {

  }

  componentDidMount() {
    this.props.energyUseActions.getEnergyUse();
    // saving the d3 chart as a property of this so we can interact with it later
    this.energyChart = new EnergyUseChartSVG({
          element: ReactDOM.findDOMNode(this.refs.d3Canvas) //passing the element that will hold the D3 JS chart
        , openModalForm: this.props.openModalForm //we can pass props and actions here as well
          // changeProjectName: this.props.projectActions.changeProjectName
      });
  }

  // Block this component from being update by react
  // We block this component from being updated because we want D3JS to take over updating the DOM for the charts
  shouldComponentUpdate(props, nextState) {
  	//YOU CAN PASS DATA HERE. REACT WILL STILL CALL ANYTHING BEFORE THE return false line
    this.energyChart.energyUse = props.state.energyUse;
    this.energyChart.reactToData();
    return false;
  }

	render(){
		return <div className="energy-use-chart-wrap">
				<div className='d3-canvas' ref='d3Canvas'>

        </div>
      </div>
	}
}


function mapStateToProps(state) {
	return {
		state: state
  };
	// return state;
}

function mapDispatchtoProps(dispatch){
	return {
		energyUseActions: bindActionCreators(energyUseActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchtoProps)(EnergyUseChart)