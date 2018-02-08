/**
 * Created by yth on 2018/2/6.
 * 书本搜索类，实现搜索功能，渲染搜索出的书籍列表
 */
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {search as searchData} from './BooksAPI'
import InputBox from './InputBox'
import BookList from './BookList'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {

  }

  state = {
    books: [],
    inputBoxItemsDisplay: true
  }

  searchBooks = (value) => {
    searchData(value).then(re => {
      this.setState({
        books: (!re || re.hasOwnProperty('error'))
          ? []
          : re.map(v => Book.createBookObj(v))
      })
    })
  }

  mouseClick(obj) {
    let inputBox = document.getElementById('inputBox')
    let posValue = inputBox.compareDocumentPosition(obj)
    this.setState({
      inputBoxItemsDisplay: (posValue&16) > 0
    })
  }

  render() {
    return (
      <div className="search-books" onClick={(e) => this.mouseClick(e.target)}>
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <InputBox
            clickInputOrItems={this.state.inputBoxItemsDisplay}
            onSearch={this.searchBooks}
          />
        </div>
        <div className="search-books-results">
          <BookList bookList={this.state.books} onChangeBook={()=>{}}/>
        </div>
      </div>
    )
  }
}

export default SearchBooks