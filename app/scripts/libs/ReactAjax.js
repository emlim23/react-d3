import React,{Component} from 'react';

export var ReactAjax = ComposedComponent => class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ajaxVal: 2
    }
  }

  componentDidMount() {
  	this.setState({
      ajaxVal: 3
    });
  }

  componentWillUnmount() {

  }

  ajax = () => {
    var xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        // console.log("on success: ", this);
        this.refs.myChild.onAjaxSuccess([xmlhttp.responseText]);
	    }
	    else{
        this.refs.myChild.onAjaxError(xmlhttp);
	    }
		}.bind(this);

		xmlhttp.open("GET", this.props.url);
		// xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send();
  }

  render() {
    return <ComposedComponent {...this.props} {...this.state} ajax={this.ajax} ref="myChild" />;
  }
};