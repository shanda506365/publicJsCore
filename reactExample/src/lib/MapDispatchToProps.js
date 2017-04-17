 import Action from './Action'
 import { 
 	fromJS
 } from 'immutable'

 const mapDispatchToProps_Common = function(dispatch, ownProps) {
 	return {
 		onPro_stateChange: (state) => dispatch(fromJS(Action.pro_stateClickAction).mergeDeep({
 			state
 		}).toJSON())
 	} 
 }
 const mapDispatchToProps = {
 	mapDispatchToProps_Main: function(dispatch, ownProps) {
 		return mapDispatchToProps_Common(dispatch, ownProps);
 	},
 	mapDispatchToProps_Count: function(dispatch, ownProps) {
 		return {
 			onIncreaseClick: () => dispatch(Action.increaseAction),
 			onTestValClick: () => dispatch({
 				type: ''
 			}),
 			onNavbarClick: (e, index) => dispatch(fromJS(Action.navbarClickAction).mergeDeep({
 				e,
 				index
 			}).toJSON())
 		}
 	},
 	mapDispatchToProps_Test: function(dispatch, ownProps) {
 		return fromJS({
 			onIncreaseTestClick: () => dispatch({
 				type: 'increaseTest',
 				filter: ownProps
 			})
 		}).mergeDeep(mapDispatchToProps_Common(dispatch, ownProps)).toJSON()
 	},
 	mapDispatchToProps_Quote: function(dispatch, ownProps) {
 		return fromJS({
 			onTabbarClick: (e, index) => dispatch(fromJS(Action.quote_tabbarClickAction).mergeDeep({
 				e,
 				index
 			}).toJSON())
 		}).mergeDeep(mapDispatchToProps_Common(dispatch, ownProps)).toJSON()
 	},
 	mapDispatchToProps_ReduxForm: function(dispatch, ownProps) {
 		return fromJS({
 			onFormSubmit: (e, values, state) => dispatch(fromJS(Action.formSubmitAction).mergeDeep({
 				e,
 				values,
 				state
 			}).toJSON()),
 			onSimpleFormLoad: () => dispatch(Action.simpleFormLoadAction),
 			onTagSelect:(e,tagSels)=>dispatch(fromJS(Action.tagSelectAction).mergeDeep({
 				e,
 				tagSels 
 			}).toJSON())
 		}).mergeDeep(mapDispatchToProps_Common(dispatch, ownProps)).toJSON()
 	}

 }


 const mapDispatchToProps_Main = mapDispatchToProps['mapDispatchToProps_Main']
 const mapDispatchToProps_Count = mapDispatchToProps['mapDispatchToProps_Count']
 const mapDispatchToProps_Test = mapDispatchToProps['mapDispatchToProps_Test']
 const mapDispatchToProps_Quote = mapDispatchToProps['mapDispatchToProps_Quote']
 const mapDispatchToProps_ReduxForm = mapDispatchToProps['mapDispatchToProps_ReduxForm']

 export {
 	mapDispatchToProps as mapDispatchToProps,
 	mapDispatchToProps_Main as mapDispatchToProps_Main,
 	mapDispatchToProps_Count as mapDispatchToProps_Count,
 	mapDispatchToProps_Test as mapDispatchToProps_Test,
 	mapDispatchToProps_Quote as mapDispatchToProps_Quote,
 	mapDispatchToProps_ReduxForm as mapDispatchToProps_ReduxForm
 }
 export default mapDispatchToProps