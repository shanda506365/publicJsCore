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
  Map,
  is
} from 'immutable'

// import IndexDBHelper, {
//   Message
// } from 'IndexDBHelper'

class ReduxForm extends Component {
  contextTypes: {
    router: React.PropTypes.object
  }
  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {},
      thisState = this.state || {};
    const map1 = fromJS(thisProps['counterReducer'].SimpleFormData)
    const map2 = fromJS(nextProps['counterReducer'].SimpleFormData)
    const map3 = fromJS(thisProps['counterReducer'].SyncValidationFormData)
    const map4 = fromJS(nextProps['counterReducer'].SyncValidationFormData)
    console.log('shouldComponentUpdate', !is(map1, map2), !is(map3, map4))

    return !is(map1, map2) || !is(map3, map4)
  }
  render() {
    // var dbHelper = new IndexDBHelper()
    // dbHelper.openDatabase('test', 'table1', false, function(omes) {
    //   if (omes.success) {
    //     dbHelper.find('table1', {
    //       content: '1'
    //     }, true, function(mes) {
    //       if (mes.success) { 
    //         dbHelper.add('table1', [{
    //           content: '1222'
    //         }], function(ames) {
    //           console.log('DbHelper', ames)
    //           if (ames.success) {
    //             dbHelper.find('table1', false, false, function(mes) {
    //               if (mes.success) {
    //                 console.log('DbHelper', mes.result)
    //               };
    //             });
    //           };
    //         });
    //       };
    //     });
    //   };
    // });
    // setTimeout(function() {
    //   dbHelper.add('table1', [{
    //     content: '1222'
    //   }], function(ames) { 
    //     if (ames.success) {
    //       dbHelper.find('table1', false, false, function(mes) {
    //         if (mes.success) {
    //           console.log('DbHelper', mes.result)
    //         };
    //       });
    //     };
    //   });
    // }, 2000)

    console.log('ReduxForm===', this.props)
    const {
      onFormSubmit,
      onSimpleFormLoad,
      onTagSelect,
      counterReducer: {
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
        }}   onTagSelect={onTagSelect} enableReinitialize={false} initialValues={SyncValidationFormData}/>
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