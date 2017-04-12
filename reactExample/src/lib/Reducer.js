 import $ from './jquery-vendor.js'
 //import merge from 'merge'
 import deepAssign from 'deep-assign'

 // Reducer
 function counterReducer(state = {
   count: 0,
   title: '消息',
   buttonText: '消息计数',
   tabIndex: 0,
   pro_state: 'Resolved', //Pending,Rejected
   Quote: {
     tabIndex: 0,
     title: 'Quote'
   }
 }, action) {
   const count = state.count
   const tstate = JSON.parse(JSON.stringify(state));
   let rObj;
   switch (action.type) {
     case 'increase':
       console.log('=====1111')
       rObj = deepAssign(tstate, {
         count: count + 1,
         title: '消息' + count
       });
       return rObj
     case 'increaseTest':
       //$('button').text('Do it hahahaha' + count)
       console.log('increaseTest', action.filter)
       rObj = deepAssign(tstate, {
         count: count + 1,
         title: '消息' + count
       });
       console.log(rObj)
       return rObj
     case 'navbarClick':
       console.log(action)
       rObj = deepAssign(tstate, {
         tabIndex: action.index
       });
       return rObj
     case 'quote_tabbarClick':

       rObj = deepAssign(tstate, {
         Quote: {
           tabIndex: action.index
         }
       });
       console.log('quote_tabbarClick', rObj)
       return rObj
     case 'pro_stateClick':
     console.log('pro_stateClick',action)
       rObj = deepAssign(tstate, {
         pro_state: action.state
       });
       return rObj
     default:
       console.log(state)
       return state
   }
 }


 export {
   counterReducer as counterReducer
 }