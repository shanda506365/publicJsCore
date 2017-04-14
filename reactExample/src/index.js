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

import Main from './Main'
import Counter from './Counter'
import Test from './Test'
import Quote from './Quote'
import SyncValidationForm from './Redux-form'
 

ReactDOM.render(
  <Provider store={GlobalStore}>
    <Router history={hashHistory}>
      <Route path="/" component={Main} > 
        <IndexRoute component={Counter} onEnter={function(nextState, replace){
              console.log('onEnter',nextState,GlobalStore.getState())
        }} 
                onLeave={function (prevState) {
                      //console.log(prevState) 
                  }}/>
        <Route path='/Test' component={Test} />
        <Route path='/Quote' component={Quote} />
        <Route path='/SyncValidationForm' component={SyncValidationForm} />
      </Route> 
    </Router> 
  </Provider>,
  document.getElementById('root')
)