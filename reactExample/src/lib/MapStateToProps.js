 import Action from './Action'


 // Map Redux state to component props
 export function mapStateToProps(state, ownProps) {
 	console.log('mapStateToProps', ownProps)
 	return {
 		count: state.count,
 		title: state.title
 	}
 }