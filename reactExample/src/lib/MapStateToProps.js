 import Action from './Action'
 
  import {
   Map,
   fromJS
 } from 'immutable'
 const mapStateToProps = { 
 	mapStateToProps_Main: function(state, ownProps) {
 		console.log('mapStateToProps_Main',state, ownProps)
 		let rObj = fromJS(state).mergeDeep({
 			stateFlag: 'mapStateToProps_Main'
 		});
 		return rObj.toJSON()
 	},
 	mapStateToProps_Counter: function(state, ownProps) {
 		console.log('mapStateToProps_Counter', ownProps)
 		let rObj = fromJS(state).mergeDeep({
 			stateFlag: 'mapStateToProps_Counter'
 		});
 		return rObj.toJSON()
 	},
 	mapStateToProps_Test: function(state, ownProps) {
 		console.log('mapStateToProps_Test', ownProps)
 		let rObj = fromJS(state).mergeDeep({
 			stateFlag: 'mapStateToProps_Test'
 		});
 		return rObj.toJSON()
 	},
 	mapStateToProps_Quote: function(state, ownProps) {
 		console.log('mapStateToProps_Quote', ownProps)
 		let rObj = fromJS(state).mergeDeep({
 			stateFlag: 'mapStateToProps_Quote'
 		});
 		return rObj.toJSON()
 	},
 	mapStateToProps_ReduxForm: function(state, ownProps) {
 		console.log('mapStateToProps_ReduxForm',state, ownProps) 
 		let rObj = fromJS(state).mergeDeep({
 			stateFlag: 'mapStateToProps_ReduxForm' 
 		});
 		return rObj.toJSON()
 	}
 }
 const mapStateToProps_Main = mapStateToProps['mapStateToProps_Main']
 const mapStateToProps_Counter = mapStateToProps['mapStateToProps_Counter']
 const mapStateToProps_Test = mapStateToProps['mapStateToProps_Test']
 const mapStateToProps_Quote = mapStateToProps['mapStateToProps_Quote']
 const mapStateToProps_ReduxForm = mapStateToProps['mapStateToProps_ReduxForm']
 export {
 	mapStateToProps as mapStateToProps,
 	mapStateToProps_Main as mapStateToProps_Main,
 	mapStateToProps_Counter as mapStateToProps_Counter,
 	mapStateToProps_Test as mapStateToProps_Test,
 	mapStateToProps_Quote as mapStateToProps_Quote,
 	mapStateToProps_ReduxForm as mapStateToProps_ReduxForm
 }
 export default mapStateToProps