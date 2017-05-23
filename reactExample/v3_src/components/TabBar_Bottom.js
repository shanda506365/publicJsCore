import React, {
  Component,
  PropTypes
} from 'react'
import ReactDOM from 'react-dom'



class TabBar_Bottom extends Component {
  choseBarItemCls(flag) {
    return "weui-tabbar__item " + (flag ? 'weui-bar__item_on' : '')
  }
  TabBar() {
    let me = this,
      arry = me.props.items || [];
    let itemIndex = me.props.itemIndex || 0;
    return arry.map(function(item, index, all) {
      return <a href="javascript:;" className={me.choseBarItemCls(index==itemIndex)} 
    			onClick={e=>me.props.onTabClick(e,index)}>
			            <span className={item.iconCls}></span>
			            <p className="weui-tabbar__label">{item.label}</p>
			        </a>
    })

  }


  render() {
    return (
      <div className="weui-tabbar">
              {this.TabBar()}
          </div>
    );
  }
}

export default TabBar_Bottom