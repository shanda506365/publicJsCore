 import $ from './jquery-vendor.js'
 //import merge from 'merge'
 // import deepAssign from 'deep-assign'
 // 
 import {  
   fromJS,
   Map
 } from 'immutable'

 const GlobalState = fromJS({
     count: 0,
     title: '消息',
     buttonText: '消息计数',
     tabIndex: 0,
     pro_state: 'Resolved', //Pending,Rejected
     Quote: {
       tabIndex: 0,
       title: 'Quote'
     },
     SimpleFormData: {
       firstName: 'Jane',
       lastName: 'Doe',
       age: 44,
       sex: 'female',
       employed: true,
       favoriteColor: 'Blue',
       bio: 'Born to write amazing Redux code.',
       radio1:'1',
       checkbox1:['1'],
       roles:[],
       radios2:''
     },
     SyncValidationFormData:{
        username:11,
        tagSels:[]
     }
   })
   // Reducer
 function counterReducer(state=GlobalState, action) { 
   const tstate =state; //JSON.parse(JSON.stringify(state));
   console.log('statestate', state);
   let rObj;
   switch (action.type) {
     case 'increase':
       console.log('=====1111',tstate.get('Quote').get('tabIndex')) 
       rObj = tstate.mergeDeep({
         count: tstate.get('count') + 1,
         title: '消息' + tstate.get('count')
       })
       return rObj
     case 'increaseTest':
       //$('button').text('Do it hahahaha' + count)
       console.log('increaseTest', action.filter)
       rObj = tstate.mergeDeep({
         count: tstate.get('count') + 1,
         title: '消息' + tstate.get('count') 
       });
       return rObj
     case 'navbarClick':
       console.log('navbarClick',action)
       rObj = tstate.set('tabIndex',action.index);
       return rObj
     case 'quote_tabbarClick': 
       rObj = tstate.setIn(['Quote','tabIndex'],action.index);
       console.log('quote_tabbarClick', rObj)
       return rObj
     case 'pro_stateClick':
       console.log('pro_stateClick', action)
       rObj = tstate.set('pro_state',action.state);
       return rObj
     case 'formSubmit':
       console.log('formSubmit', action)
       rObj = tstate.set('pro_state', action.state);
       return rObj
     case 'simpleFormLoad':
       console.log('simpleFormLoad', action)
       rObj= tstate.setIn(['SimpleFormData','lastName'],'count:' + tstate.get('count'))  
       return rObj
     case 'tagSelect':
       console.log('tagSelect', action)
       rObj= tstate.setIn(['SyncValidationFormData','tagSels'],action.tagSels)  
       return rObj
     default:
       console.log(state)
       return state
   }
 }


 export {
   counterReducer as counterReducer
 }