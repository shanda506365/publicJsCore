 import Action from './Action'
 import objectAssign from 'object-assign'
 const mapStateToProps = {
 	stateInit:{
 		
 	},
 	mapStateToProps_Main: function(state, ownProps) {
 		console.log('mapStateToProps_Main', ownProps)
 		return {
 			count: state.count,
 			title: state.title,
 			buttonText: state.buttonText,
 			tabIndex: state.tabIndex,
 			stateFlag: 'mapStateToProps_Main'
 		}
 	},
 	mapStateToProps_Counter: function(state, ownProps) {
 		console.log('mapStateToProps_Counter', ownProps)
 		return {
 			count: state.count,
 			title: state.title,
 			buttonText: state.buttonText,
 			tabIndex: state.tabIndex,
 			stateFlag: 'mapStateToProps_Counter'
 		}
 	},
 	mapStateToProps_Test: function(state, ownProps) {
 		console.log('mapStateToProps_Test', ownProps)
 		return {
 			count: state.count,
 			title: state.title,
 			buttonText: state.buttonText,
 			tabIndex: state.tabIndex,
 			stateFlag: 'mapStateToProps_Test'
 		}
 	},
 	mapStateToProps_Quote: function(state, ownProps) {
 		console.log('mapStateToProps_Quote', ownProps)
 		let rObj = objectAssign(state, {
 			stateFlag: 'mapStateToProps_Quote'
 		});
 		return rObj
 	}
 }
 const mapStateToProps_Main = mapStateToProps['mapStateToProps_Main']
 const mapStateToProps_Counter = mapStateToProps['mapStateToProps_Counter']
 const mapStateToProps_Test = mapStateToProps['mapStateToProps_Test']
 const mapStateToProps_Quote = mapStateToProps['mapStateToProps_Quote']
 export {
 	mapStateToProps as mapStateToProps,
 	mapStateToProps_Main as mapStateToProps_Main,
 	mapStateToProps_Counter as mapStateToProps_Counter,
 	mapStateToProps_Test as mapStateToProps_Test,
 	mapStateToProps_Quote as mapStateToProps_Quote
 }
 export default mapStateToProps