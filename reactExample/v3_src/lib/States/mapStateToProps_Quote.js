 

 import {
 	fromJS
 } from 'immutable'

 const mapStateToProps_Quote = function(state, ownProps) { 
 	let rObj = fromJS(state).mergeDeep({
 		stateFlag: 'mapStateToProps_Quote'
 	});
 	return rObj.toJSON()
 }

export{
 	mapStateToProps_Quote
 }

 export default mapStateToProps_Quote