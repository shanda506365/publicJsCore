import React, {
	Component,
	PropTypes
} from 'react'
import ReactDOM from 'react-dom'
 
 

const renderField = ({
	input,
	label,
	type,
	val,
	meta: {
		touched,
		error,
		warning
	}
}) => {
	let cls = 'weui-cell',
		errorDom = [];
	if (touched && error) {
		cls += ' weui-cell_warn';
		errorDom.push(<div className="weui-cell__ft">
            <i className="weui-icon-warn"></i>
        </div>)
	}
	if (type == 'checkbox') { 
		return (<div className="weui-cells weui-cells_checkbox">
		   <label className="weui-cell weui-check__label">
		        <div className="weui-cell__hd">
		            <input name={input.name} type={type} className="weui-check" 
		             value={val} checked={input.value.indexOf(val) !== -1} onChange={(event) => {
                               const newValue = [...input.value];
                               if (event.target.checked) {
                                   newValue.push(val);
                               } else {
                                   newValue.splice(newValue.indexOf(val), 1);
                               }

                               return input.onChange(newValue);
                           }}/>
		            <i className="weui-icon-checked"></i>
		        </div>
		        <div className="weui-cell__bd">
		            <p>{label}</p>
		        </div>
		    </label>
		</div>)
	}

	if (type == 'radio') {

		return (<label className="weui-cell weui-check__label" >
		        <div className="weui-cell__bd">
		            <p>{label}</p>
		        </div>
		        <div className="weui-cell__ft">
		            <input {...input} type={type} className="weui-check"/>
		            <span className="weui-icon-checked"></span>
		        </div>
		    </label>)
	}; 
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


export default renderField