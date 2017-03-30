 import $ from './jquery-vendor.js'
 //import merge from 'merge'
 import objectAssign from 'object-assign'

 // Reducer
 function counterReducer(state = {
   count: 0,
   title: '消息',
   buttonText: '消息计数',
   tabIndex: 0
 }, action) {
   const count = state.count
   const tstate = objectAssign({}, state);
   let rObj;
   switch (action.type) {
     case 'increase':
       rObj = objectAssign(tstate, {
         count: count + 1,
         title: '消息' + count
       });
       return rObj
     case 'increaseTest':
       //$('button').text('Do it hahahaha' + count)
       console.log(action.filter)
       rObj = objectAssign(tstate, {
         count: count + 1,
         title: '消息' + count
       });
       console.log(rObj)
       return rObj
     case 'navbarClick':
       console.log(action) 
       rObj = objectAssign(tstate, {
         tabIndex: action.index
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