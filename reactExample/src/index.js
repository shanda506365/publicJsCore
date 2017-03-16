import React, {
  Component,
  PropTypes
} from 'react'
import ReactDOM from 'react-dom'
import {
  createStore
} from 'redux'
import {
  Provider,
  connect
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
import {mapStateToProps} from './lib/MapStateToProps'
import {mapDispatchToProps} from './lib/MapDispatchToProps'


import Main from './Main'
import Counter from './Counter'
import Test from './Test'
 

// Connected Component
const con_Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
const con_Counter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
const con_Test = connect(
  mapStateToProps,
  mapDispatchToProps
)(Test)


ReactDOM.render(
  <Provider store={GlobalStore}>
    <Router history={hashHistory}>
      <Route path="/" component={con_Main} > 
        <IndexRoute component={con_Counter}/>
        <Route path='/Test' component={con_Test} />
      </Route> 
    </Router> 
  </Provider>,
  document.getElementById('root')
)