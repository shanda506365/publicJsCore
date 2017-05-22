 import {
 	Action
 } from '../Action'
 import {
 	fromJS
 } from 'immutable'
 import common, {
 	Ajax,
 	API
 } from '../common'

 const mapDispatchToProps_Common = function(dispatch, ownProps) {
 	return {
 		onMain_TabbarClick: (e, index) => {
 			dispatch(Action.Main_TabbarClickAction(e,index))
 			Ajax({
 				url: API.login,
 				doneFun: function(msg) {
 					let data = JSON.parse(msg) 
 					if (data.suc) {
 						dispatch(Action.Main_TabbarClickAction(e,index))

 						switch (index) {
 							case 0:
 								ownProps.router.push({
 									pathname: '/'
 								})
 								return
 							case 1:
 								ownProps.router.push({
 									pathname: '/PageTwo'
 								})
 								return
 							case 2:
 								ownProps.router.push({
 									pathname: '/Quote'
 								})
 								return
 							case 3:
 								ownProps.router.push({
 									pathname: '/PageFour'
 								})
 								return
 							default:
 								ownProps.router.push({
 									pathname: '/'
 								})
 								return

 						}


 					} else {
 						setTimeout(function() {
 							dispatch(Action.pro_stateClickAction('Resolved'))
 						}, 1)

 					}
 				},
 				failFun: function(jqXHR, textStatus) {

 				},
 				alwaysFun: function() {},
 				props: dispatch
 			})

 		},
 		onPro_stateChange: (state) => dispatch(Action.pro_stateClickAction(state)),
 		dispatch 
 	}

 }

 export {
 	mapDispatchToProps_Common
 }
 export default mapDispatchToProps_Common