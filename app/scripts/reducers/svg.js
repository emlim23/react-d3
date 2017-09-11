import {constants} from '../config/constants';

export default function svgReducer(svgCoords = {}, action){
	switch(action.type){
		case constants.SVG_MOUSE_DOWN:
			return Object.assign({}, svgCoords, {x: action.x, y: action.y});
		case constants.SVG_MOUSE_DRAG:
			return Object.assign({}, svgCoords, {x: action.x, y: action.y});
		default: 
			return svgCoords;
	}
}