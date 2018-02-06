/**
 * Created by yth on 2018/2/6.
 * 书籍类，保存书籍的基本渲染信息
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired
  }

  state = {
    shelf: 'None'
  }

  render() {
    const {id, imageUrl, title, authors, shelf} = this.props

    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${imageUrl}")` }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={shelf}>
                <option value="none" disabled="disabled">Move to...</option>
                <option value="currentlyReading" disabled={'currentlyReading' === shelf ? 'disabled' : ''}>Currently Reading</option>
                <option value="wantToRead" disabled={'wantToRead' === shelf ? 'disabled' : ''}>Want to Read</option>
                <option value="read" disabled={'read' === shelf ? 'disabled' : ''}>Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors.join()}</div>
        </div>
      </li>
    )
  }
}

export default Book