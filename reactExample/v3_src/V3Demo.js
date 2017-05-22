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
  syncHistoryWithStore
} from 'react-router-redux'
import {
  V3Store
} from './lib/Store'

const history = syncHistoryWithStore(hashHistory, V3Store)


// history.listen((location) => console.log('pathname',location))  

ReactDOM.render(
  <Provider store={V3Store}>
    <Router history={history}>
      <Route path="/" getComponents={(nextState,callback)=>{
                                    require.ensure([],(require)=>{
                                        callback(null,require("./Main").default)
                                    },"router_V3_Main")
                                }}  > 
        <IndexRoute  getComponents={(nextState,callback)=>{
                                    require.ensure([],(require)=>{
                                        callback(null,require("./PageOne").default)
                                    },"router_V3_PageOne")
                                }}  onEnter={function(nextState, replace){
              console.log('onEnter',nextState,V3Store.getState())
        }} 
                onLeave={function (prevState) {
                      //console.log(prevState) 
                  }}/>
        <Route path='/Quote' getComponents={(nextState,callback)=>{
                                    require.ensure([],(require)=>{
                                        callback(null,require("./Quote").default)
                                    },"router_V3_Quote")
                                }} />
         <Route path='/PageTwo' getComponents={(nextState,callback)=>{
                                    require.ensure([],(require)=>{
                                        callback(null,require("./PageTwo").default)
                                    },"router_V3_PageTwo")
                                }} />
        <Route path='/PageFour' getComponents={(nextState,callback)=>{
                                    require.ensure([],(require)=>{
                                        callback(null,require("./PageFour").default)
                                    },"router_V3_PageFour")
                                }} />
      </Route> 
    </Router> 
  </Provider>,
  document.getElementById('root')
)