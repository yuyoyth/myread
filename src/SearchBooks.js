/**
 * Created by yth on 2018/2/6.
 */
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import {search as searchData} from './BooksAPI'
import InputBox from './InputBox'
import BookList from './BookList'
import Book from './Book'
import PropTypes from "prop-types";

class SearchBooks extends Component {
  /**
   * 书本搜索类，实现搜索功能，渲染搜索出的书籍列表
   * @param idToShelf 书籍id与书架种类的映射关系
   * @param onChangeBook 书籍更改书架调用方法
   * @type {{idToShelf: Object, onChangeBook: Function}}
   */
  static propTypes = {
    idToShelf: PropTypes.object.isRequired,
    onChangeBook: PropTypes.func.isRequired
  };

  /**
   * @param books 搜索得到的书籍列表
   * @type {{books: Array}}
   */
  state = {
    books: []
  };

  /**
   * 根据字符串参数去请求服务端返回书籍数据
   * @param value String 搜索用字符串
   */
  searchBooks = (value) => {
    //请求服务端
    searchData(value).then(re => {
      this.setState({
        books: (!re || re.hasOwnProperty('error'))
          ? []
          : this.bookToShelf(re.map(v => Book.createBookObj(v)))
      })
    })
  };

  /**
   * 使用id-书架映射修改状态中书籍的书架种类
   * @param books
   * @returns {Object}
   */
  bookToShelf(books) {
    const {idToShelf} = this.props;
    return books.map(book => {
      //替换每本书的书架
      book.shelf = (idToShelf.hasOwnProperty(book.id) ? idToShelf[book.id] : 'none');
      return book;
    })
  }

  render() {
    //处理书籍列表中的书架，并按名称排序
    let books = this.bookToShelf(this.state.books);
    books.sort(sortBy('title'));

    return (
      <div className="search-books"
           //绑定搜索候选项的监听事件
           onClick={(e) => this.inputBox.mouseClick(e.target)}>
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <InputBox
            onSearch={this.searchBooks}
            //获得此组件对象，用于绑定搜索候选项的监听事件
            ref={(inputBox) => {this.inputBox = inputBox}}
          />
        </div>
        <div className="search-books-results">
          <BookList bookList={books} onChangeBook={this.props.onChangeBook}/>
        </div>
      </div>
    )
  }
}

export default SearchBooks