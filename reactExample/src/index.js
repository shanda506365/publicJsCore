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
import {GlobalStore} from './Store'
import Action from './Action'
import Main from './Main'
import Counter from  './Counter'
import Test from './Test'  
 
 

// Map Redux state to component props
function mapStateToProps(state, ownProps) {
  console.log('mapStateToProps',ownProps)
  return {
    count: state.count,
    title: state.title
  }
} 
// Map Redux actions to component props  
function mapDispatchToProps(dispatch,ownProps) {
  return {
    onIncreaseClick: () => dispatch(Action.increaseAction),
    onIncreaseTestClick: () => dispatch({
       type:'increaseTest',
       filter:ownProps
    })
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
const App1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
 const App2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(Test)


ReactDOM.render(
  <Provider store={GlobalStore}>
    <Router history={hashHistory}>
      <Route path="/" component={App} > 
        <IndexRoute component={App1}/>
        <Route path='/Test' component={App2} />
      </Route>

    </Router> 
  </Provider>,
  document.getElementById('root')
)