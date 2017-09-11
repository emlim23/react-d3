import React, { Component } from 'react'

class UserIcon extends Component{
	constructor(props){
		super(props);
	}

	componentWillMount() {

  }

	render(){
		const userIconStyle = Object.assign({
			border: "1px solid #333",
			borderRadius: "50px",
			padding: "10px"
		}, this.props.style);


		return <div className="user-icon" style={userIconStyle}>
				{this.props.user.initials}
      </div>
	}
}

export default UserIcon