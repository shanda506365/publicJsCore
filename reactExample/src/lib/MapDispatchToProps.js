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
 	},
 	mapDispatchToProps_Quote:function(dispatch, ownProps){
 		return {
 			onTabbarClick:(e,index)=> dispatch(objectAssign(Action.quote_tabbarClickAction, {
 				e,
 				index
 			}))
 		}
 	}
 }

 const mapDispatchToProps_Main = mapDispatchToProps['mapDispatchToProps_Main']
 const mapDispatchToProps_Count = mapDispatchToProps['mapDispatchToProps_Count']
 const mapDispatchToProps_Test = mapDispatchToProps['mapDispatchToProps_Test']
 const mapDispatchToProps_Quote = mapDispatchToProps['mapDispatchToProps_Quote']
 export {
 	mapDispatchToProps as mapDispatchToProps,
 	mapDispatchToProps_Main as mapDispatchToProps_Main,
 	mapDispatchToProps_Count as mapDispatchToProps_Count,
 	mapDispatchToProps_Test as mapDispatchToProps_Test,
 	mapDispatchToProps_Quote as mapDispatchToProps_Quote
 }
 export default mapDispatchToProps