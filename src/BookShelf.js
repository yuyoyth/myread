/**
 * Created by yth on 2018/2/6.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BookList from './BookList'

class BookShelf extends Component {
  /**
   * 书架组件
   * @param kind 书架的类别，值为["wantToRead", "currentlyReading", "read"]之一
   * @param bookList 包含的书籍，对象数组
   * @param onChangeBook 书籍改变所在书架时调用的函数
   * @type {{kind: (string), bookList: (array), onChangeBook: (function)}}
   */
  static propTypes = {
    kind: PropTypes.string.isRequired,
    bookList: PropTypes.array.isRequired,
    onChangeBook: PropTypes.func.isRequired
  }

  /**
   * 书架种类，字符串数组，顺序敏感，影响书架渲染顺序
   * @type {array}
   */
  static kinds = [
    'currentlyReading',
    'wantToRead',
    'read'
  ]

  //存储书架种类对应的书架名称
  static title = {
    currentlyReading: 'Currently Reading',
    wantToRead: 'Want to Read',
    read: 'Read'
  }

  render() {
    const {kind, bookList, onChangeBook} = this.props
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{BookShelf.title[kind]}</h2>
        <div className="bookshelf-books">
          <BookList bookList={bookList} onChangeBook={onChangeBook}/>
        </div>
      </div>
    )
  }
}

export default BookShelf