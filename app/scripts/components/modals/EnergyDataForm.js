import React, { Component } from 'react'

import classNames from 'classnames';


class EnergyDataForm extends Component{
	constructor(props){
		super(props);

		this.state = {energyData: {}, open: false}
	}

	componentWillMount() {

  }

  openModal = () => {
  	this.setState({energyData: Object.assign({}, this.props.energyData), open: true})
  }

  close = () => {
  	this.setState({open: false})
  }

  save = () => {
  	this.setState({open: false});
  	this.props.updateData(this.state.energyData, this.refs.valTxt.value);
  }

  getDefaultValue(){
  	return this.props.energyData.value ? this.props.energyData.value.toString() : "";
  }

	render(){ //will change this to a proper modal later
		let className = classNames({
	      open: this.state.open,
	      "energy-data-form": true,
	      modal: true
	    });

		return <div className={className}>
				<div className="bg"></div>
				<div className="modal-body">
					<b>{this.props.energyData.monthName} - {this.props.energyData.fieldName}</b>
					<br/>
					<br/>
					<label>Value: </label>
					<input key={this.props.energyData.monthName + this.props.energyData.fieldName + this.getDefaultValue()} ref="valTxt" type="text" defaultValue={this.getDefaultValue()} />
					<br/>
					<br/>
					<button onClick={this.save}>Save</button>
					<button onClick={this.close}>Close</button>
				</div>
      </div>
	}
}

export default EnergyDataForm