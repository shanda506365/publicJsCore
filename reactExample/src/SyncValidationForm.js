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
	Field,
	reduxForm
} from 'redux-form'

import 'rc-select/assets/index.css';
import Select, {
    Option
  } from 'rc-select/lib/index';

const validate = values => {
	const errors = {}
	if (!values.username) {
		errors.username = 'Required'
	} else if (values.username.length > 15) {
		errors.username = 'Must be 15 characters or less'
	}
	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}
	if (!values.age) {
		errors.age = 'Required'
	} else if (isNaN(Number(values.age))) {
		errors.age = 'Must be a number'
	} else if (Number(values.age) < 18) {
		errors.age = 'Sorry, you must be at least 18 years old'
	}
	return errors
}

const warn = values => {
	const warnings = {}
	if (values.age < 19) {
		warnings.age = 'Hmm, you seem a bit young...'
	}
	return warnings
}

const renderField = ({
	input,
	label,
	type,
	meta: {
		touched,
		error,
		warning
	}
}) => {
	return (
		<div>
		    <label>{label}</label>
		    <div>
		      <input {...input} placeholder={label} type={type}/>
		      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
		    </div>
  		</div>
	)
}
const renderLink = ({
		input,
		text,
		to
	}) => 
	<Link {...input} to={to}>{text}</Link>


const renderSelect = ({
		input,
		options,
		tagSels
	})=> {
	console.log(options)
	return (<Select animation={null} 
            dropdownMenuStyle={{maxHeight:120,overflow: 'auto'}} 
            style={{ width: '100%' }}
            multiple={true} 
            readOnly={true}
            optionFilterProp="children"
            optionLabelProp="title" 
            placeholder="点击此处批量选择分类设置利润"
            notFoundContent="没有该分类或该分类不支持设置利润"
            onChange={(val)=>{ 
                //me.setState({ tagSels: val } ); 
            }}  
            tokenSeparators={[' ', ',']} 
          >
            {options}
          </Select>)
}


const SyncValidationForm = (props) => {
	const {
		handleSubmit,
		pristine,
		reset,
		submitting
	} = props
	 let options = [],tagSels=[]
	 options.push(<Option key={1}  title={111111}> 
            {'tesetest'}
          </Option>);
	return (
		<form onSubmit={handleSubmit}>
	      <Field name="username" type="text" component={renderField} label="Username"/>
	      <Field name="email" type="email" component={renderField} label="Email"/>
	      <Field name="age" type="number" component={renderField} label="Age"/>
	      <Field
	          name="favoriteColor"
	          component={renderLink} text='计数' to="/"/>
	      <Field
	          name="select"
	          component={renderSelect} options={options}/>
	      <div>
	        <button type="submit" disabled={submitting}>Submit</button>
	        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
	      </div>
    	</form>
	)
}

export default reduxForm({
	form: 'syncValidation', // a unique identifier for this form
	validate, // <--- validation function given to redux-form
	warn // <--- warning function given to redux-form
})(SyncValidationForm)