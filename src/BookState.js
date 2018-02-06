/**
 * Created by yth on 2018/2/6.
 * 书籍状态切换类，渲染按钮，存储书籍状态，包含书籍状态切换功能
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BookState extends Component {
  static propTypes = {

  }

  render() {
    return(
      <div className="book-shelf-changer">
        <select>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookState