import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import SearchBooks from './SearchBooks'
import BooksShowcase from './BooksShowcase'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        {/*搜索页面*/}
        <Route path="/search" render={() => (
          <SearchBooks/>
        )}/>

        {/*书架展示台*/}
        <Route exact path="/" render={() => (
          <BooksShowcase/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
