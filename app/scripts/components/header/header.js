import React, { Component } from 'react'

class HeaderSection extends Component{
	constructor(props){
		super(props)
		this.state = {chartView: "stacked"}
	}

	handleRadioChange = (e) => {
  	this.setState({chartView:  e.currentTarget.value})
  }


	render(){
		const navBarStyle = {
			padding: "10px 0",
			margin: "0 0 20px 0"
		}

		const imgStyle = {
			width: "40px",
	    height: "40px",
	    margin: "-5px 5px 0 10px",
	    float: "left"
		}

		const headLinkStyle = {
			fontSize: "14px",
	    padding: "10px",
	    color: "#333",
	    float: "right"
		}

		return <nav className="navbar navbar-fixed-top" style={navBarStyle}>
				<form>
				  <label><input type="radio" name="mode" className="chart-view-select" value="grouped" onChange={this.handleRadioChange} checked={this.state.chartView == "grouped"} />Grouped</label>
				  <label><input type="radio" name="mode" className="chart-view-select" value="stacked" onChange={this.handleRadioChange} checked={this.state.chartView == "stacked"} />Stacked</label>
				</form>
				<a className="user-name" href="/" style={headLinkStyle}>
          User Name
        </a>
        <div className="clearfix"></div>
      </nav>
	}
}

export default HeaderSection