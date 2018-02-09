/**
 * Created by yth on 2018/2/6.
 */
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import BookShelf from './BookShelf'

class BooksShowcase extends Component {
  /**
   * 展示台组件
   * @param books 包括三种书架数据的对象
   * @param onChangeBook 书籍改变书架时的回调方法
   * @type {{books: *, onChangeBook: *}}
   */
  static propTypes = {
    books: PropTypes.object.isRequired,
    onChangeBook: PropTypes.func.isRequired
  };

  render() {
    //对书架中的书籍按照名称排序，控制排版
    let booksList = {};
    BookShelf.kinds.forEach(v => {
      booksList[v] = this.props.books[v];
      booksList[v].sort(sortBy('title'))
    });

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {BookShelf.kinds.map(v => (
              <BookShelf
                key={v}
                kind={v}
                bookList={booksList[v]}
                onChangeBook={this.props.onChangeBook}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksShowcase