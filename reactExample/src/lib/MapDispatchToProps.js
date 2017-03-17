 import Action from './Action'


 // Map Redux actions to component props  
 export function mapDispatchToProps(dispatch, ownProps) {
 	return {
 		onIncreaseClick: () => dispatch(Action.increaseAction),
 		onIncreaseTestClick: () => dispatch({
 			type: 'increaseTest',
 			filter: ownProps
 		})
 	}
 }