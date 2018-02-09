/**
 * Created by yth on 2018/2/7.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class InputBoxItems extends Component {
  /**
   * 搜索候选项列表组件
   * @param display 是否显示组件
   * @param items 组件显示条目
   * @param onClickItem 点击条目回调方法
   * @type {{display: bool, items: Array, onClickItem: Function}}
   */
  static propTypes = {
    display: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    onClickItem: PropTypes.func.isRequired
  };

  /**
   * 点击条目获取条目的值并调用属性中的回调方法
   * @param obj 被点击的dom对象
   */
  clickItem(obj) {
    let value = obj.getAttribute('data-value');
    this.props.onClickItem(value);
  }

  render() {
    const {items} = this.props;
    return(
      <div className="search-books-bomb" style={{height: 'auto', display: this.props.display ? 'block' : 'none'}}>
        <ul>
          {items.map(v => (
            <li
              key={v}
              className="search-books-bomb-item"
              data-value={v}
              onClick={(event) => {this.clickItem(event.target)}}
            >{v}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default InputBoxItems