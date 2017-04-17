 import $ from './jquery-vendor.js'
 //import merge from 'merge'
 // import deepAssign from 'deep-assign'
 // 
 import { 
   fromJS
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
       bio: 'Born to write amazing Redux code.' 
     },
     SyncValidationFormData:{
        username:11,
        tagSels:[]
     }
   })
   // Reducer
 function counterReducer(state = GlobalState.toJSON(), action) {
   const count = state.count
   const tstate = fromJS(state); //JSON.parse(JSON.stringify(state));
   console.log('statestate', state);
   let rObj;
   switch (action.type) {
     case 'increase':
       console.log('=====1111')
       rObj = tstate.mergeDeep({
         count: count + 1,
         title: '消息' + count
       })
       return rObj.toJSON()
     case 'increaseTest':
       //$('button').text('Do it hahahaha' + count)
       console.log('increaseTest', action.filter)
       rObj = tstate.mergeDeep({
         count: count + 1,
         title: '消息' + count
       });
       console.log(rObj)
       return rObj.toJSON()
     case 'navbarClick':
       console.log(action)
       rObj = tstate.set('tabIndex',action.index);
       return rObj.toJSON()
     case 'quote_tabbarClick': 
       rObj = tstate.setIn(['Quote','tabIndex'],action.index);
       console.log('quote_tabbarClick', rObj)
       return rObj.toJSON()
     case 'pro_stateClick':
       console.log('pro_stateClick', action)
       rObj = tstate.set('pro_state',action.state);
       return rObj.toJSON()
     case 'formSubmit':
       console.log('formSubmit', action)
       rObj = tstate.set('pro_state', action.state);
       return rObj.toJSON()
     case 'simpleFormLoad':
       console.log('simpleFormLoad', action)
       rObj= tstate.setIn(['SimpleFormData','lastName'],'count:' + tstate.get('count')) 
       console.log('simpleFormLoad', rObj)
       return rObj.toJSON()
     case 'tagSelect':
       console.log('tagSelect', action)
       rObj= tstate.setIn(['SyncValidationFormData','tagSels'],action.tagSels) 
       console.log('tagSelect', rObj.toJSON())
       return rObj.toJSON()
     default:
       console.log(state)
       return state
   }
 }


 export {
   counterReducer as counterReducer
 }