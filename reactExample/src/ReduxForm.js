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


class ReduxForm extends Component {
  render() {
    console.log('ReduxForm===', this.props)
    const {
      onFormSubmit,
      onSimpleFormLoad
    } = this.props,{
      SimpleFormData
    } = this.props.counterReducer
    

    return (
      <div>
        <Link className='weui-btn weui-btn_default' to="/Test">消息计数</Link>
        <SyncValidationForm onSubmit={values =>{
          onFormSubmit(null,values,'Rejected')
        }} />
        <div>
          <button type="button" onClick={() => onSimpleFormLoad(SimpleFormData)}>Load Account</button>
        </div>
        <SimpleForm onSubmit={values =>{
          onFormSubmit(null,values,'Rejected')
        }}  {...this.props}  enableReinitialize={true} initialValues={SimpleFormData}/>
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