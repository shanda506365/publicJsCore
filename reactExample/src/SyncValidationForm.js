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
	let cls = 'weui-cell',errorDom=[];
	if(touched && error){
		cls += ' weui-cell_warn';
		errorDom.push(<div className="weui-cell__ft">
            <i className="weui-icon-warn"></i>
        </div>)
	}
	 
	return (
		<div>
			<div className={cls}>
			    <div className="weui-cell__hd"><label className='weui-label'>{label}</label></div>
			    <div className="weui-cell__bd">
			      <input {...input} className='weui-input' placeholder={label} type={type}/> 
			    </div>
			    {errorDom}
			   
	  		</div>
	  		 {touched && ((error && <div className={cls}>{error}</div>) || (warning && <div className={cls}>{warning}</div>))}
  	    </div>
	)
}
const renderLink = ({
		input,
		text,
		to,
		className
	}) => 
	<Link {...input} to={to} className={className}>{text}</Link>


const renderSelect = ({
		input,
		options,
		tagSels,
		onTagSelect
	})=> {
	console.log('renderSelect',options,
		tagSels,
		onTagSelect)
	return (<Select value={tagSels} animation={null} 
            dropdownMenuStyle={{maxHeight:120,overflow: 'auto'}} 
            style={{ width: '100%' }}
            multiple={true} 
            readOnly={true}
            optionFilterProp="children"
            optionLabelProp="title" 
            placeholder="点击此处批量选择分类设置利润"
            notFoundContent="没有该分类或该分类不支持设置利润"
            onChange={(val)=>{ 
                onTagSelect(null,val)
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
		submitting,
		onTagSelect,
		initialValues
	} = props
	 let options = []
	 options.push(<Option key={1}  title={111111}> 
            {'tesetest'}
          </Option>);
	  options.push(<Option key={2}  title={3333}> 
            {'tesetes3333t'}
          </Option>);
	console.log('SyncValidationForm',props)
	return (
		<form onSubmit={handleSubmit} className='weui-cells weui-cells-form'>
	      <Field name="username" type="text"  component={renderField} label="Username"/>
	      <Field name="email" type="email" component={renderField} label="Email"/>
	      <Field name="age" type="number" component={renderField} label="Age"/>
	      <Field className='weui-btn weui-btn_default'
	          name="favoriteColor"
	          component={renderLink} text='计数' to="/"/>
	      <Field
	          name="tagSels"
	          component={renderSelect} onTagSelect={onTagSelect} options={options} tagSels={initialValues.tagSels} 
	            />
	      <div className='weui-flex'>
	      	<div className="weui-flex__item">
	      		<button className='weui-btn weui-btn_primary' type="submit" disabled={submitting}>Submit</button>
	      	</div>
	        <div className="weui-flex__item">
	        	<button className={'weui-btn weui-btn_default' + (pristine || submitting?' weui-btn_disabled':'')} type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
	        </div>
	        
	      </div>
    	</form>
	)
}

export {renderField as renderField}

export default reduxForm({
	form: 'syncValidation', // a unique identifier for this form
	validate, // <--- validation function given to redux-form
	warn // <--- warning function given to redux-form
})(SyncValidationForm)