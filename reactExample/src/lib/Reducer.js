 import $ from './jquery-vendor.js'
 //import merge from 'merge'
 import deepAssign from 'deep-assign'

 // Reducer
 function counterReducer(state = {
   count: 0,
   title: '消息',
   buttonText: '消息计数',
   tabIndex: 0,
   Quote:{
      tabIndex:0,
      title:'Quote'
   } 
 }, action) {
   const count = state.count
   const tstate = deepAssign({}, state);
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
       console.log('increaseTest',action.filter)
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
       const temp = JSON.parse(JSON.stringify(tstate));
       rObj = deepAssign(temp, { 
         Quote: {
           tabIndex: action.index
         }
       });
       console.log('quote_tabbarClick',rObj)
       return rObj
     default:
       console.log(state)
       return state
   }
 }
 

 export {
   counterReducer as counterReducer 
 }