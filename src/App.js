import React from 'react'
import {Route} from 'react-router-dom'
import './App.css'
import SearchBooks from './SearchBooks'
import BooksShowcase from './BooksShowcase'
import BookShelf from './BookShelf'
import {getAll as getAllData} from "./BooksAPI"
import Book from "./Book"

class BooksApp extends React.Component {
  /**
   * 应用组件
   */

  /**
   * @param bookShelf 书架数据，多个书架，书架名为属性，每个属性对应一个数组
   * @param idToShelf 书籍id与书架种类的映射
   * @type {{bookShelf: {}, idToShelf: {}}}
   */
  state = {
    bookShelf: {},
    idToShelf: {}
  };

  constructor(props) {
    super(props);
    //初始化state，为每个书架创建数组
    let bookShelfObj = {};
    BookShelf.kinds.forEach(v => {
      bookShelfObj[v] = []
    });
    this.state.bookShelf = bookShelfObj;
  }

  /**
   * 从服务端获得所有在书架上的书籍，并将书籍分类到各个书籍渲染
   */
  getAllBooks = () => {
    getAllData().then(v => {
      //初始化存放书籍的各个书架数组
      let bookShelfObj = {}, idToShelfObj = {};
      BookShelf.kinds.forEach(v => {
        bookShelfObj[v] = []
      });

      //遍历取得的书籍数据
      for (let i = 0; i < v.length; i++) {
        let book = Book.createBookObj(v[i]);

        //记录id所属类别
        idToShelfObj[book.id] = book.shelf;

        //将书籍分类
        BookShelf.kinds.forEach(v => {
          if (book.shelf === v) {
            bookShelfObj[v].push(book);
          }
        })
      }

      this.setState({
        bookShelf: bookShelfObj,
        idToShelf: idToShelfObj
      })
    })
  };

  /**
   * 书籍迁移时改变对应的书架的书籍数组，并重新渲染
   * @param book object 包含改变后的书籍信息
   * @param oldShelf string 书籍改变前所在的书架类别
   */
  changeABook = (book, oldShelf) => {
    const id = book.id, newShelf = book.shelf;
    const {bookShelf, idToShelf} = this.state;
    let newBookShelf = bookShelf, newIdToShelf = idToShelf;
    newIdToShelf[id] = newShelf;
    newBookShelf[newShelf].push(book);
    oldShelf !== 'none' && (newBookShelf[oldShelf] = bookShelf[oldShelf].filter(v => v.id !== id));
    this.setState({
      bookShelf: newBookShelf,
      idToShelf: newIdToShelf
    })
  };

  //初始化时从服务器端获取数据并构建应用
  componentDidMount() {
    this.getAllBooks()
  }

  render() {
    return (
      <div className="app">
        {/*搜索页面*/}
        <Route path="/search" render={() => (
          <SearchBooks
            idToShelf={this.state.idToShelf}
            onChangeBook={this.changeABook}
          />
        )}/>

        {/*书架展示台*/}
        <Route exact path="/" render={() => (
          <BooksShowcase
            books={this.state.bookShelf}
            onChangeBook={this.changeABook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
