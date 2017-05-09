 import Action from '../Action'

 import {
 	fromJS
 } from 'immutable'

 const mapStateToProps_ReduxForm = function(state, ownProps) {
 	console.log('mapStateToProps_ReduxForm', state, ownProps)
 	let rObj = fromJS(state).mergeDeep({
 		stateFlag: 'mapStateToProps_ReduxForm'
 	});
 	return rObj.toJSON()
 }


 export default mapStateToProps_ReduxForm