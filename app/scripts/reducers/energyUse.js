import {constants} from '../config/constants';

// function getId(todos){
// 	return todos.reduce((maxId, todo) => {
// 		return Math.max(todo.id, maxId)
// 	}, -1) + 1
// }

export default function energyUseReducer(energyUse = [], action){
	switch(action.type){
		case constants.GET_ENERGYUSE:
			return action.payload.map((ed) => ed);
		case constants.REMOVE_HEATING:
			return action.payload.map((ed) => ed);
		case constants.UPDATE_DATA:
			return action.payload.map((ed) => ed);
		default: 
			return energyUse;
	}
}