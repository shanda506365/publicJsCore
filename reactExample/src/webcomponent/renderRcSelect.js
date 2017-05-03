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
        return (<Select {... this.props}   onChange={(val)=>{onTagSelect(null,val)}} 
            value={tagSels}
          >
            {options}
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