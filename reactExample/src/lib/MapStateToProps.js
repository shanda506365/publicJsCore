 import Action from './Action'

 const mapStateToProps = {
 	mapStateToProps_Main: function (state, ownProps) {
 		console.log('mapStateToProps_Main', ownProps)
 		return {
 			count: state.count,
 			title: state.title,
 			buttonText: state.buttonText,
 			tabIndex: state.tabIndex,
 			stateFlag:'mapStateToProps_Main'
 		}
 	},
 	mapStateToProps_Counter: function (state, ownProps) {
 		console.log('mapStateToProps_Counter', ownProps)
 		return {
 			count: state.count,
 			title: state.title,
 			buttonText: state.buttonText,
 			tabIndex: state.tabIndex,
 			stateFlag:'mapStateToProps_Counter'
 		}
 	},
 	mapStateToProps_Test: function (state, ownProps) {
 		console.log('mapStateToProps_Test', ownProps)
 		return {
 			count: state.count,
 			title: state.title,
 			buttonText: state.buttonText,
 			tabIndex: state.tabIndex,
 			stateFlag:'mapStateToProps_Test'
 		}
 	}
 }
 export {mapStateToProps as mapStateToProps} 
 export default mapStateToProps
 