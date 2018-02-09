/**
 * Created by yth on 2018/2/7.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import InputBoxItems from './InputBoxItems'
import searchTerm from './static/SEARCH_TERMS.md'

class InputBox extends Component {
  /**
   * 搜索框组件
   * @param onSearch 搜索回调方法
   * @type {{onSearch: *}}
   */
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  /**
   * @param query 输入内容
   * @param itemsDisplay 候选项显示控制
   * @param items 候选项显示词组列表
   * @param terms 候选词组全集
   * @type {{query: string, itemsDisplay: boolean, items: Array, terms: Array}}
   */
  state = {
    query: '',
    itemsDisplay: false,
    items: [],
    terms: []
  };

  constructor(props) {
    super(props);
    //读取候选项词组文件并加入到state的terms中
    fetch(searchTerm).then((response) => {
      return response.text()
    }).then(text => {
      this.state.terms = text.trim().replace(/'/g, "").split(', ')
    })
  }

  /**
   * 输入内容改变时回调方法
   * @param query 输入字符串
   */
  updateQuery = (query) => {
    let showingItems = [];
    if (query) {
      //过滤敏感字符并搜索匹配的词组，再默认排序
      const match = new RegExp(escapeRegExp(query), 'i');
      showingItems = this.state.terms.filter(term => match.test(term));
      showingItems.sort()
    }
    this.setState({
      query: query.trim(),
      itemsDisplay: !!query,
      items: showingItems.slice(0, 5)
    });
    //有完全匹配的词组时直接进行搜索
    for (let i = 0; i < showingItems.length; i++) {
      if (query.toLowerCase() === showingItems[i].toLowerCase()) {
        this.props.onSearch(showingItems[i]);
        break;
      }
    }
  };

  /**
   * 候选词组点击回调方法
   * @param value 词组字符串
   */
  clickItem = (value) => {
    this.setState({
      query: value,
      itemsDisplay: false
    });
    //调用上级的搜索方法
    this.props.onSearch(value)
  };

  /**
   * 上层组件用到的监听点击回调方法
   * @param obj 被点击的dom对象
   */
  mouseClick(obj) {
    //获得搜索输入相关的最外层dom对象
    const inputBox = document.getElementById('inputBox');
    //获取inputBox与obj的相对位置
    const posValue = inputBox.compareDocumentPosition(obj);
    let bomb = document.getElementsByClassName('search-books-bomb')[0];
    // X1XXX 表示obj在inputBox内部，可同时有多种关系
    // XXXXX & 01000 = (01000 or 00000)，因此 posValue&16 > 0 即判断obj是否在inputBox内部
    bomb.style.display = ((posValue&16) > 0) ? 'block' : 'none';
  }

  render() {
    return(
      <div id="inputBox" className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        <InputBoxItems
          display={this.state.itemsDisplay}
          items={this.state.items}
          onClickItem={this.clickItem}
        />
      </div>
    )
  }
}

export default InputBox