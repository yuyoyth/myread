/**
 * Created by yth on 2018/2/6.
 * 书架类，存储书籍列表
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
    kind: PropTypes.string.isRequired,
    bookList: PropTypes.array.isRequired
  }

  getTitle(kind) {
    switch (kind) {
      case 'currentlyReading':
        return 'Currently Reading';
      case 'wantToRead':
        return 'Want to Read';
      case 'read':
        return 'Read';
      default:
        return 'None';
    }
  }

  render() {
    const {kind, bookList} = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.getTitle(kind)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {bookList.map(book =>
              <Book
                key={book.id}
                id={book.id}
                imageUrl={book.imageUrl}
                title={book.title}
                authors={book.authors}
                shelf={book.shelf}/>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf