 

 import {
 	fromJS
 } from 'immutable'

 const mapStateToProps_Main = function(state, ownProps) { 
 	let rObj = fromJS(state).mergeDeep({
 		stateFlag: 'mapStateToProps_Main'
 	});
 	return rObj.toJSON()
 }
 export{
 	mapStateToProps_Main
 }

 export default mapStateToProps_Main