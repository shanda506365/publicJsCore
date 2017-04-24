import React, {
    Component,
    PropTypes
} from 'react'
import ReactDOM from 'react-dom'

import 'rc-select/assets/index.css';
import Select, {
    Option
  } from 'rc-select/lib/index';

const renderRcSelect = ({
		input,
		options,
		tagSels,
		onTagSelect
	})=> { 
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

export default renderRcSelect