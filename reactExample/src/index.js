import React, {
  Component,
  PropTypes
} from 'react'
import ReactDOM from 'react-dom'
import {
  createStore
} from 'redux'
import {
  Provider 
} from 'react-redux'
import {
  Router,
  Route,
  Link,
  hashHistory,
  IndexRoute,
  IndexLink
} from 'react-router'


import {
  GlobalStore 
} from './lib/Store' 



// import Main from './Main'
// import Counter from './Counter'
// import Test from './Test'
// import Quote from './Quote'
// import ReduxForm from './ReduxForm' 

ReactDOM.render(
  <Provider store={GlobalStore}>
    <Router history={hashHistory}>
      <Route path="/" getComponents={(nextState,callback)=>{
                                    require.ensure([],(require)=>{
                                        callback(null,require("./Main").default)
                                    },"router_Main")
                                }}  > 
        <IndexRoute  getComponents={(nextState,callback)=>{
                                    require.ensure([],(require)=>{
                                        callback(null,require("./Counter").default)
                                    },"router_Counter")
                                }}  onEnter={function(nextState, replace){
              console.log('onEnter',nextState,GlobalStore.getState())
        }} 
                onLeave={function (prevState) {
                      //console.log(prevState) 
                  }}/>
        <Route path='/Test' getComponents={(nextState,callback)=>{
                                    require.ensure([],(require)=>{
                                        callback(null,require("./Test").default)
                                    },"router_Test")
                                }} />
        <Route path='/Quote' getComponents={(nextState,callback)=>{
                                    require.ensure([],(require)=>{
                                        callback(null,require("./Quote").default)
                                    },"router_Quote")
                                }} />
        <Route path='/ReduxForm' getComponents={(nextState,callback)=>{
                                    require.ensure([],(require)=>{
                                        callback(null,require("./ReduxForm").default)
                                    },"router_ReduxForm")
                                }} />
      </Route> 
    </Router> 
  </Provider>,
  document.getElementById('root')
)