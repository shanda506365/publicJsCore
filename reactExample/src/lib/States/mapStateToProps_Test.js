 import Action from '../Action'

 import {
 	fromJS
 } from 'immutable'

 const mapStateToProps_Test = function(state, ownProps) {
 	console.log('mapStateToProps_Test', ownProps)
 	let rObj = fromJS(state).mergeDeep({
 		stateFlag: 'mapStateToProps_Test'
 	});
 	return rObj.toJSON()
 }


 export default mapStateToProps_Test