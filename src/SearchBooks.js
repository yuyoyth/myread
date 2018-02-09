/**
 * Created by yth on 2018/2/6.
 * 书本搜索类，实现搜索功能，渲染搜索出的书籍列表
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
  static propTypes = {
    idToShelf: PropTypes.object.isRequired,
    onChangeBook: PropTypes.func.isRequired
  }

  state = {
    books: []
  }

  searchBooks = (value) => {
    const {idToShelf} = this.props
    searchData(value).then(re => {
      this.setState({
        books: (!re || re.hasOwnProperty('error'))
          ? []
          : this.bookToShelf(re.map(v => Book.createBookObj(v)))
      })
    })
  }

  bookToShelf(books) {
    const {idToShelf} = this.props
    return books.map(book => {
      book.shelf = (idToShelf.hasOwnProperty(book.id) ? idToShelf[book.id] : 'none')
      return book
    })
  }

  render() {
    let books = this.bookToShelf(this.state.books)
    books.sort(sortBy('title'))
    return (
      <div className="search-books" onClick={(e) => this.inputBox.mouseClick(e.target)}>
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <InputBox
            onSearch={this.searchBooks}
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