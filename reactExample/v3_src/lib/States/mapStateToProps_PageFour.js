 import {
 	fromJS
 } from 'immutable'



 const mapStateToProps_PageFour = function(state, ownProps) {
 	let rObj = fromJS(state).mergeDeep({
 		stateFlag: 'mapStateToProps_PageFour'
 	});
  
 	return rObj.toJSON()
 }

export{
 	mapStateToProps_PageFour
 }
 export default mapStateToProps_PageFour