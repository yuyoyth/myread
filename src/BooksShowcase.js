/**
 * Created by yth on 2018/2/6.
 * 展示台类，列举所有书架及书架内的书籍
 */
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class BooksShowcase extends Component {
  state = {
    bookList: []
  }

  getAllBooks() {
    BooksAPI.getAll().then((v) => {
      this.setState({
        bookList: v.map((e) => ({
          id: e.id,
          imageUrl: e.imageLinks.smallThumbnail,
          title: e.title,
          authors: e.authors,
          shelf: e.shelf
        }))
      })
    })
  }

  componentDidMount() {
    this.getAllBooks()
  }

  render() {
    const {bookList} = this.state

    let currentlyReadingList = [], wantToReadList = [], readList = []
    for(let i = 0; i < bookList.length; i++) {
      if ('currentlyReading' === bookList[i].shelf)
        currentlyReadingList.push(bookList[i])
      else if ('wantToRead' === bookList[i].shelf)
        wantToReadList.push(bookList[i])
      else if ('read' === bookList[i].shelf)
        readList.push(bookList[i])
    }
    currentlyReadingList.sort(sortBy('title'))
    wantToReadList.sort(sortBy('title'))
    readList.sort(sortBy('title'))

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf kind="currentlyReading" bookList={currentlyReadingList}/>
            <BookShelf kind="wantToRead" bookList={wantToReadList}/>
            <BookShelf kind="read" bookList={readList}/>
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