 import Action from '../Action'

 import {
 	fromJS
 } from 'immutable'

 const mapStateToProps_Counter = function(state, ownProps) {
 	console.log('mapStateToProps_Counter', ownProps)
 	let rObj = fromJS(state).mergeDeep({
 		stateFlag: 'mapStateToProps_Counter'
 	});
 	return rObj.toJSON()
 }


 export default mapStateToProps_Counter