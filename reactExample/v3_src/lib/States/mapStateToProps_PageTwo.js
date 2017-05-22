 import {
 	fromJS
 } from 'immutable'



 const mapStateToProps_PageTwo = function(state, ownProps) {
 	let rObj = fromJS(state).mergeDeep({
 		stateFlag: 'mapStateToProps_PageTwo'
 	});
  
 	return rObj.toJSON()
 }

export{
 	mapStateToProps_PageTwo
 }
 export default mapStateToProps_PageTwo