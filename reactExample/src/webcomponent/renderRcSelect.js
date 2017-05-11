import React, {
    Component,
    PropTypes
} from 'react'
import ReactDOM from 'react-dom'

import 'rc-select/assets/index.css';
import Select, {
    Option
} from 'rc-select/lib/index';

class renderRcSelect extends Component {
    render() { 
        const {
            input,
            options,
            onTagSelect,
            tagSels
        } = this.props
        let opts = options||[],optsDom=[]

        for (var i = 0; i < opts.length; i++) {
            optsDom.push(<Option key={opts[i].key}  title={opts[i].title}> 
                    {opts[i].text}
                  </Option>);
        };
        return (<Select {...this.props}   onChange={(val)=>{onTagSelect(null,val)}} 
            value={tagSels}
          >
           {optsDom}
          </Select>)
    }
}
// const renderRcSelect = ({
//     input,
//     options,
//     tagSels,
//     onTagSelect
// }) => {

//     return (<Select {...input} 
//           >
//             {options}
//           </Select>)
// }

export default renderRcSelect