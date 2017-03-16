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
import Main from './Main'
import Counter from  './Counter'
import Test from './Test'





// Action
const Action = {
  increaseAction: {
    type: 'increase'
  },
  increaseTestAction :{
    type: 'increaseTest'
  }
}



// Reducer
function counter(state = {
  count: 0,
  title: '消息'
}, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return {
        count: count + 1,
        title:state.title
      }
    case 'increaseTest':
      return {
        count: count + 1,
        title: '消息' + count
      }
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    count: state.count,
    title: state.title
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(Action.increaseAction),
    onIncreaseTestClick: () => dispatch(Action.increaseTestAction)
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
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} > 
        <IndexRoute component={App1}/>
        <Route path='/Test' component={App2} />
      </Route>

    </Router> 
  </Provider>,
  document.getElementById('root')
)