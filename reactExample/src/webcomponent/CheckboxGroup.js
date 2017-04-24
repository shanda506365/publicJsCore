import React, {
	Component,
	PropTypes
} from 'react'
import ReactDOM from 'react-dom'

class CheckboxGroup extends Component {
 
    checkboxGroup() {
        let {label, required, options, input, meta} = this.props;
        let arr = [];
        for (var i = 0; i < options.length; i++) {
        	let index = i ; 
        		arr.push(<div className="weui-cells weui-cells_checkbox" key={i}>
	                <label className="weui-cell weui-check__label">
	                	<div className="weui-cell__hd">
		                    <input type="checkbox" className="weui-check" 
		                           name={input.name}
		                           value={options[i].name}
		                           checked={input.value.indexOf(options[i].name) !== -1}
		                           onChange={(event) => {
		                               const newValue = [...input.value]; 
		                               if (event.target.checked) {
		                                   newValue.push(options[index].name);
		                               } else {
		                                   newValue.splice(newValue.indexOf(options[index].name), 1);
		                               }

		                               return input.onChange(newValue);
		                           }}/>
		                      <i className="weui-icon-checked"></i>
		        		</div>
	                    <div className="weui-cell__bd">
				            <p>{options[i].name}</p>
				        </div>
	                </label>
            	</div>)
        	}; 
        return arr
        	
    }

    render() {
        return (
            <div className='weui-cells weui-cells_checkbox'>
                {this.checkboxGroup()}
            </div>
        )
    }
}

export default CheckboxGroup