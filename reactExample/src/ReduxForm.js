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
import SimpleForm from './SimpleForm';

class ReduxForm extends Component {
  submit(values) {
    // Do something with the form values
    console.log(values);
  }
  render() {
    return (
      <div>
        <SyncValidationForm onSubmit={this.submit} />
        <SimpleForm onSubmit={this.submit} />
      </div> 
    );
  }
}

const con_ReduxForm = connect(
  mapStateToProps_Quote,
  mapDispatchToProps_Quote
)(ReduxForm)

export {
  ReduxForm as ReduxForm, con_ReduxForm as con_ReduxForm
}
export default con_ReduxForm