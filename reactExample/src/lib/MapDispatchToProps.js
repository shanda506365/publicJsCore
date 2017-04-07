 import Action from './Action'
 import objectAssign from 'object-assign'

 const mapDispatchToProps = {
 	mapDispatchToProps_Main: function(dispatch, ownProps) {
 		return {}
 	},
 	mapDispatchToProps_Count: function(dispatch, ownProps) {
 		return {
 			onIncreaseClick: () => dispatch(Action.increaseAction),
 			onTestValClick: () => dispatch({
 				type: ''
 			}),
 			onNavbarClick: (e, index) => dispatch(objectAssign(Action.navbarClickAction, {
 				e,
 				index
 			}))
 		}
 	},
 	mapDispatchToProps_Test: function(dispatch, ownProps) {
 		return {
 			onIncreaseTestClick: () => dispatch({
 				type: 'increaseTest',
 				filter: ownProps
 			})
 		}
 	}
 }

 export {
 	mapDispatchToProps as mapDispatchToProps
 }
 export default mapDispatchToProps