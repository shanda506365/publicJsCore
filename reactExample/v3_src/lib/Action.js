 //v3
 const Action = {
 	Main_TabbarClickAction: function(e, index) {
 		return {
 			type: 'Main_TabbarClick',
 			e,
 			index
 		}
 	},
 	pro_stateClickAction: function(state, user) {
 		return {
 			type: 'pro_stateClick', 
 			state,
 			user
 		}
 	},
 	onSomeButtonClickedAction: function() {
 		return {
 			type: 'onSomeButtonClicked'
 		}
 	},
 	onInputChange:function(payload){
 		return {
 			type:'onInputChange',
 			payload
 		}
 	}
 }

 export {
 	Action
 }
 export default Action