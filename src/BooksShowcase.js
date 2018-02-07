/**
 * Created by yth on 2018/2/6.
 */
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class BooksShowcase extends Component {
  /**
   * 展示台组件，展示所有书架内容
   */

  /**
   * 书籍种类，字符串数组，顺序敏感，影响书架渲染顺序
   * @type {array}
   */
  static kinds = [
    'currentlyReading',
    'wantToRead',
    'read'
  ]

  constructor(props) {
    super(props)
    //初始化state，为每个书架创建数组
    let stateObj = {}
    for (let i = 0; i < BooksShowcase.kinds.length; i++) {
      stateObj[BooksShowcase.kinds[i]] = []
    }
    this.state = stateObj
  }

  /**
   * 从服务端获得所有在书架上的书籍，并将书籍分类到各个书籍渲染
   */
  getAllBooks = () => {
    BooksAPI.getAll().then(v => {
      //初始化存放书籍的各个书架数组
      let stateObj = {}
      for (let i = 0; i < BooksShowcase.kinds.length; i++) {
        stateObj[BooksShowcase.kinds[i]] = []
      }

      //遍历取得的书籍数据
      for (let i = 0; i < v.length; i++) {
        let book = {
          id: v[i].id,
          imageUrl: v[i].imageLinks.smallThumbnail,
          title: v[i].title,
          authors: v[i].authors,
          shelf: v[i].shelf
        }

        //将书籍分类
        for (let i = 0; i < BooksShowcase.kinds.length; i++) {
          if (book.shelf === BooksShowcase.kinds[i]) {
            stateObj[BooksShowcase.kinds[i]].push(book)
            break
          }
        }
      }

      this.setState(stateObj)
    })
  }

  /**
   * 书籍迁移时改变对应的书架的书籍数组，并重新渲染
   * @param book object 包含改变后的书籍信息
   * @param oldShelf string 书籍改变前所在的书架类别
   */
  changeABook = (book, oldShelf) => {
    const newShelf = book.shelf
    let newShelfArray = this.state[newShelf]
    newShelfArray.push(book)
    let newStateObj = {}
    newStateObj[oldShelf] = this.state[oldShelf].filter(v => v.id !== book.id)
    newStateObj[newShelf] = newShelfArray
    this.setState(newStateObj)
  }

  componentDidMount() {
    this.getAllBooks()
  }

  render() {
    //对书架中的书籍按照名称排序，控制排版
    for (let i = 0; i < BooksShowcase.kinds.length; i++) {
      this.state[BooksShowcase.kinds[i]].sort(sortBy('title'))
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {
              BooksShowcase.kinds.map(kind =>
                <BookShelf
                  key={kind}
                  kind={kind}
                  bookList={this.state[kind]}
                  onChangeBook={this.changeABook}
                />
              )
            }
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