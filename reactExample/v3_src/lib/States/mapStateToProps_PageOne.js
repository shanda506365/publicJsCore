 import {
 	fromJS
 } from 'immutable'



 const mapStateToProps_PageOne = function(state, ownProps) {
 	let rObj = fromJS(state).mergeDeep({
 		stateFlag: 'mapStateToProps_PageOne'
 	});
  
 	return rObj.toJSON()
 }

export{
 	mapStateToProps_PageOne
 }
 export default mapStateToProps_PageOne