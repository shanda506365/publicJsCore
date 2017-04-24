import React, {
	Component,
	PropTypes
} from 'react'
import ReactDOM from 'react-dom'

class RadioGroup extends Component {
 
    RadioGroup() {
        let {label, required, options, input, meta} = this.props;
        let arr = [];
        for (var i = 0; i < options.length; i++) {
    		arr.push(<label className="weui-cell weui-check__label">
		        <div className="weui-cell__bd">
		            <p>{options[i].name}</p>
		        </div>
		        <div className="weui-cell__ft">
		            <input name={input.name} type='radio' className="weui-check"
		             value={options[i].name}/>
		            <span className="weui-icon-checked"></span>
		        </div>
		    </label>)
    	}; 
        return arr
        	
    }

    render() {
        return (
            <div className='weui-cells weui-cells_radio'>
                {this.RadioGroup()}
            </div>
        )
    }
}

export default RadioGroup