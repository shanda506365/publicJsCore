 import $ from './jquery-vendor.js'


 // Reducer
 function counterReducer(state = {
   count: 0,
   title: '消息'
 }, action) {
   const count = state.count
   switch (action.type) {
     case 'increase':
       return {
         count: count + 1,
         title: '消息' + count
       }
     case 'increaseTest':
       $('button').text('Do it hahahaha' + count)
       console.log(action.filter)
       return {
         count: count + 1,
         title: '消息' + count
       }
     default:
       return state
   }
 }

 export {
   counterReducer as counterReducer
 }