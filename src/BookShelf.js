/**
 * Created by yth on 2018/2/6.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

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
          <ol className="books-grid">
            {bookList.map(book =>
              <Book
                key={book.id}
                id={book.id}
                imageUrl={book.imageUrl}
                title={book.title}
                authors={book.authors}
                shelf={book.shelf}
                onChangeBook={onChangeBook}
              />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf