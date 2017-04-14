import React, {
	Component,
	PropTypes
} from 'react'
import ReactDOM from 'react-dom'
import {
	connect
} from 'react-redux'
 

import {
	mapStateToProps_Quote
} from './lib/MapStateToProps'
import {
	mapDispatchToProps_Quote
} from './lib/MapDispatchToProps'
 

import SyncValidationForm from './SyncValidationForm';

class SimpleForm extends Component {
  submit(values){
    // Do something with the form values
    console.log(values);
  }
  render() {
    return (
      <SyncValidationForm onSubmit={this.submit} />
    );
  }
}

const con_SimpleForm = connect(
	mapStateToProps_Quote,
	mapDispatchToProps_Quote
)(SimpleForm)

export {
	SimpleForm as SimpleForm, con_SimpleForm as con_SimpleForm
}
export default con_SimpleForm