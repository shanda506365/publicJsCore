 import {
 	createStore,
 	combineReducers
 } from 'redux'
 import {
 	reducer as reduxFormReducer
 } from 'redux-form';
 import {
 	counterReducer 
 } from './Reducer'

 const reducer = combineReducers({
 	counterReducer: counterReducer,
 	form: reduxFormReducer, // mounted under "form"
 });
 // Store
 const store = createStore(reducer)

 

 export {
 	store as GlobalStore 
 }