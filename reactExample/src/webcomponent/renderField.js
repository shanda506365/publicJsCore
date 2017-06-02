import React, {
	Component,
	PropTypes
} from 'react'
import ReactDOM from 'react-dom'

import "antd/dist/antd.less"
import moment from 'moment' 
import {
	Input,
	DatePicker,
	message
} from 'antd'

moment.locale('zh-cn');
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
	if (type == 'text') {
		return (<Input {...input} placeholder={label} type={type}/>)
	};
	if (type == 'datepicker') {

		return (<div style={{ width: 400, margin: '100px auto' }}>
            <DatePicker name={input.name} value={moment(input.value)}  onChange={(value,dateString) => {
             
              message.info('您选择的日期是: ' + value.toString()+'##'+dateString); 
              return input.onChange(value);
            }} />
          <div style={{ marginTop: 20 }}>当前日期：</div>
       </div>)
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