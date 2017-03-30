 import Action from './Action'
 import objectAssign from 'object-assign'

 // Map Redux actions to component props  
 export function mapDispatchToProps(dispatch, ownProps) {
 	return {
 		onIncreaseClick: () => dispatch(Action.increaseAction),
 		onIncreaseTestClick: () => dispatch({
 			type: 'increaseTest',
 			filter: ownProps
 		}),
 		onTestValClick:()=>dispatch({type:''}),
 		onNavbarClick:(e,index)=>dispatch(objectAssign(Action.navbarClickAction,{e,index}))
 	}
 }