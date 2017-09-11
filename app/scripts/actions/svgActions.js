import {constants} from '../config/constants';

let actions = {
	//Todo Actions
	mouseDown: function(x, y){
		return {
			type: constants.SVG_MOUSE_DOWN, 
      x: x,
      y: y
		}
	},
	mouseDrag: function(x, y){
		return {
			type: constants.SVG_MOUSE_DRAG, 
      x: x,
      y: y
		}
	}
}

export default actions