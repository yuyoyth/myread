/**
 * Created by yth on 2018/2/6.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {update as updateBookData} from './BooksAPI'
import BookImage from './BookImage'
import BookShelfChange from './BookShelfChange'

class Book extends Component {
  /**
   * 书籍组件
   * @param id 书籍id
   * @param imageUrl 书籍封面链接
   * @param title 书籍名
   * @param authors 书籍作者，字符串数组
   * @param shelf 所在书架
   * @param onChangeBook 书架改变时更新书架所调用的方法
   * @type {{
   * id: (string), imageUrl: (string), title: (string),
   * authors: (array), shelf: (string), onChangeBook: (function)
   * }}
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    onChangeBook: PropTypes.func.isRequired
  }

  /**
   * 将书籍改变到指定书架，并调用更新书架的方法
   * @param newShelf string 指定迁移到的书架，值为["wantToRead", "currentlyReading", "read"]之一
   */
  updateBook = (newShelf) => {
    const {id, imageUrl, title, authors, shelf, onChangeBook} = this.props
    updateBookData({id: id}, newShelf).then(v => {
      if (v[newShelf].indexOf(id) >= 0) {
        onChangeBook({
          id: id,
          imageUrl: imageUrl,
          title: title,
          authors: authors,
          shelf: newShelf,
        }, shelf)
      }
    })
  }

  render() {
    const {imageUrl, title, authors, shelf} = this.props

    return(
      <li>
        <div className="book">
          <div className="book-top">
            <BookImage imageUrl={imageUrl}/>
            <BookShelfChange shelf={shelf} onChangeShelf={this.updateBook}/>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors.join()}</div>
        </div>
      </li>
    )
  }
}

export default Book