 import {
   createStore
 } from 'redux'

 import {
   counterReducer
 } from './Reducer'
 // Store
 const store = createStore(counterReducer)


 export {
   store as GlobalStore
 }