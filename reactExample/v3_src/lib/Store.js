 import {
 	applyMiddleware,
 	createStore,
 	combineReducers
 } from 'redux'
 import {
 	reducer as reduxFormReducer
 } from 'redux-form';
 import {
 	V3DemoReducer
 } from './Reducer'
 import {
 	routerReducer
 } from 'react-router-redux'
 import {createLogger} from 'redux-logger'
 import "babel-polyfill"

 // import thunk from 'redux-thunk'
 import createSagaMiddleware from 'redux-saga'
 import rootSaga from './sagas/mySaga'

 //V3
 const combineV3DemoReducer = combineReducers({
 	V3DemoReducer: V3DemoReducer,
 	form: reduxFormReducer, // mounted under "form"
 	routing: routerReducer
 });
 const logger = createLogger();
 const sagaMiddleware = createSagaMiddleware()

 const V3Store = createStore(combineV3DemoReducer, applyMiddleware(logger,sagaMiddleware))
 sagaMiddleware.run(rootSaga)


 export {
 	V3Store
 }