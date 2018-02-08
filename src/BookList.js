/**
 * Created by yth on 2018/2/7.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookList extends Component {
  /**
   * 书籍列表组件
   * @param bookList 包含的书籍，对象数组
   * @param onChangeBook 书籍改变所在书架时调用的函数
   * @type {{bookList: (array), onChangeBook: (function)}}
   */
  static propTypes = {
    bookList: PropTypes.array.isRequired,
    onChangeBook: PropTypes.func.isRequired
  }

  render() {
    const {bookList, onChangeBook} = this.props

    return(
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
    )
  }
}

export default BookList