import React, {
  Component,
  PropTypes
} from 'react'
import ReactDOM from 'react-dom'
import {
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
  mapStateToProps_ReduxForm
} from './lib/MapStateToProps'
import {
  mapDispatchToProps_ReduxForm
} from './lib/MapDispatchToProps'


import SyncValidationForm from './SyncValidationForm';
import SimpleForm from './SimpleForm';

 import { 
   fromJS,
   Map, is
 } from 'immutable'


class ReduxForm extends Component {
  contextTypes: {
    router: React.PropTypes.object
  }
  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {}, thisState = this.state || {}; 
    const map1 = fromJS(thisProps['counterReducer'].SimpleFormData)
    const map2 = fromJS(nextProps['counterReducer'].SimpleFormData)
    console.log('shouldComponentUpdate',is(map1, map2))

    return !is(map1, map2)
  }
  render() {
    console.log('ReduxForm===', this.props)
    const {
      onFormSubmit,
      onSimpleFormLoad,
      onTagSelect,
      counterReducer:{
        SimpleFormData,
        SyncValidationFormData
      }
    } = this.props,
    me = this;


    return (
      <div>
        <button className='weui-btn weui-btn_default' onClick={
          ()=> {me.props.router.push({
                              pathname: '/Test' 
                            })}
        }>消息计数</button>
        <SyncValidationForm onSubmit={values =>{
          onFormSubmit(null,values,'Rejected','SyncValidationFormData')
        }}   onTagSelect={onTagSelect} initialValues={SyncValidationFormData}/>
        <div>
          <button type="button" className='weui-btn weui-btn_default' onClick={() => onSimpleFormLoad(SimpleFormData)}>Load Account</button>
        </div>
        <SimpleForm onSubmit={values =>{
          onFormSubmit(null,values,'Rejected','SimpleFormData')
        }} onSimpleFormLoad={onSimpleFormLoad} enableReinitialize={true} 
         initialValues={SimpleFormData}
        />
      </div>
    );
  }
}

const con_ReduxForm = connect(
  mapStateToProps_ReduxForm,
  mapDispatchToProps_ReduxForm
)(ReduxForm)

export {
  ReduxForm as ReduxForm, con_ReduxForm as con_ReduxForm
}
export default con_ReduxForm