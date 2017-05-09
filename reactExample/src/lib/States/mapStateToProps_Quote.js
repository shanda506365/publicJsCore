 import Action from '../Action'

 import {
 	fromJS
 } from 'immutable'

 const mapStateToProps_Quote = function(state, ownProps) {
 		console.log('mapStateToProps_Quote', ownProps)
 		let rObj = fromJS(state).mergeDeep({
 			stateFlag: 'mapStateToProps_Quote'
 		});
 		return rObj.toJSON()
 	}


 export default mapStateToProps_Quote