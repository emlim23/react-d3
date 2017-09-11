import Api from '../config/Api';
import {constants} from '../config/constants';

let energyData = [
	{
			id: 0
		,	month: 1
		, monthName: 'Jan'
		, usage: {
					heating: 20
				, cooling: 15
				, lighting: 10
				, electronics: 30
			}
	},
	{
			id: 1
		,	month: 2
		, monthName: 'Feb'
		, usage: {
					heating: 10
				, cooling: 25
				, lighting: 30
				, electronics: 20
			}
	},
	{
			id: 2
		,	month: 3
		, monthName: 'Mar'
		, usage: {
					heating: 25
				, cooling: 10
				, lighting: 30
				, electronics: 10
			}
	},
	{
			id: 3
		,	month: 4
		, monthName: 'Apr'
		, usage: {
					heating: 30
				, cooling: 5
				, lighting: 15
				, electronics: 25
			}
	},
	{
			id: 4
		,	month: 5
		, monthName: 'May'
		, usage: {
					heating: 5
				, cooling: 50
				, lighting: 10
				, electronics: 35
			}
	},
	{
			id: 5
		,	month: 6
		, monthName: 'Jun'
		, usage: {
					heating: 20
				, cooling: 10
				, lighting: 30
				, electronics: 35
			}
	},
	{
			id: 6
		,	month: 7
		, monthName: 'Jul'
		, usage: {
					heating: 25
				, cooling: 35
				, lighting: 40
				, electronics: 10
			}
	},
	{
			id: 7
		,	month: 8
		, monthName: 'Aug'
		, usage: {
					heating: 40
				, cooling: 5
				, lighting: 25
				, electronics: 25
			}
	},
	{
			id: 8
		,	month: 9
		, monthName: 'Sep'
		, usage: {
					heating: 35
				, cooling: 10
				, lighting: 30
				, electronics: 20
			}
	},
	{
			id: 9
		,	month: 10
		, monthName: 'Oct'
		, usage: {
					heating: 25
				, cooling: 15
				, lighting: 15
				, electronics: 25
			}
	},
	{
			id: 10
		,	month: 11
		, monthName: 'Nov'
		, usage: {
					heating: 40
				, cooling: 10
				, lighting: 15
				, electronics: 30
			}
	},
	{
			id: 11
		,	month: 12
		, monthName: 'Dec'
		, usage: {
					heating: 45
				, cooling: 10
				, lighting: 15
				, electronics: 15
			}
	},
]

let actions = {
	//Todo Actions
	getEnergyUse: function(){
		return {
			type: constants.GET_ENERGYUSE,
		  payload: energyData
		  // Api.get('listProjects')
				// 		        .then(res => {
				// 		          if(res.ok) {
				// 		            return res.json();
				// 		          }
				// 		        })
				// 		        .then((projects) => {
				// 		        	return projects
				// 		        })
		}
	},
	removeHeating: function(){
		let noHeating = energyData.map((eu) => {
			return {
					id: eu.id
				,	month: eu.month
				, monthName: eu.monthName
				, usage: {
							cooling: eu.usage.cooling
						, lighting: eu.usage.lighting
						, electronics: eu.usage.electronics
					}
			}
		})
		return {
			type: constants.REMOVE_HEATING,
			payload: noHeating
		}
	},
	updateData: function(ed, newVal){
		let newData = energyData.map((eu) => {
			let tmp = Object.assign({}, eu);

			if(ed.monthName == eu.monthName){
				tmp.usage[ed.fieldName] = parseInt(newVal);
			}
			return tmp;
		})
		return {
			type: constants.UPDATE_DATA,
			payload: newData
		}
	}
}

export default actions