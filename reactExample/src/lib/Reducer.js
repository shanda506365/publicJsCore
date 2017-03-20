 import $ from './jquery-vendor.js'
 //import merge from 'merge'


 // Reducer
 function counterReducer(state = {
   count: 0,
   title: '消息',
   buttonText: '消息计数'
 }, action) {
   const count = state.count
   const tstate = Object.assign({},state);
   let rObj;
   switch (action.type) {
     case 'increase':
       rObj = Object.assign(tstate, {
         count: count + 1,
         title: '消息' + count
       });
       return  rObj
     case 'increaseTest':
       //$('button').text('Do it hahahaha' + count)
       console.log(action.filter)
       rObj = Object.assign(tstate, {
         count: count + 1,
         title: '消息' + count 
       });
       console.log(rObj)
       return rObj
     default:
       console.log(state)
       return state
   }
 }

 export {
   counterReducer as counterReducer
 }