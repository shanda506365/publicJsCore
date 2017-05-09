 import Action from '../Action'

 import {
 	fromJS
 } from 'immutable'

 const mapStateToProps_Main = function(state, ownProps) {
 	console.log('mapStateToProps_Main', state, ownProps)
 	let rObj = fromJS(state).mergeDeep({
 		stateFlag: 'mapStateToProps_Main'
 	});
 	return rObj.toJSON()
 }


 export default mapStateToProps_Main