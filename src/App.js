import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BooksShowcase from './BooksShowcase'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks/>
        )}/>

        <Route exact path="/" render={() => (
          <BooksShowcase/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
