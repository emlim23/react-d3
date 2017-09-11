import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import energyUseActions from '../../actions/energyUseActions'

import EnergyUseChart from './EnergyUseChart'
import EnergyDataForm from '../modals/EnergyDataForm'

class EnergyUse extends Component{
	constructor(props){
		super(props);

		this.state = {buttonTxt: "Remove Heating", modal: false, selectedBar: {}}
	}

	componentWillMount() {

  }

  componentDidMount() {

  }

  onClickHandler = () => {
    if(this.state.buttonTxt == "Remove Heating"){
      this.props.energyUseActions.removeHeating();
      this.setState({buttonTxt: "Return Heating"});
    }
    else{
      this.props.energyUseActions.getEnergyUse();
      this.setState({buttonTxt: "Remove Heating"});
    }

    // console.log(this.state);
  }

  openModalForm = (d) => {
    this.setState({selectedBar: d});
    this.refs.energyModal.openModal();
    // console.log(this.refs.energyModal);
  }

	render(){
		return <div className="energy-use-wrap">
        <button onClick={this.onClickHandler}>{this.state.buttonTxt}</button>
        <EnergyDataForm ref="energyModal" energyData={this.state.selectedBar} updateData={this.props.energyUseActions.updateData} />

        <EnergyUseChart openModalForm={this.openModalForm} />
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

export default connect(mapStateToProps, mapDispatchtoProps)(EnergyUse)