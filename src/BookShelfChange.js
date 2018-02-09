/**
 * Created by yth on 2018/2/7.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BookShelfChange extends Component {
  /**
   * 书籍书架改变组件
   * @param shelf 已处于的书架
   * @param onChangeShelf 书架改变使调用的函数
   * @type {{shelf: (string), onChangeShelf: (function)}}
   */
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  render() {
    const {shelf, onChangeShelf} = this.props;
    return(
      <div className="book-shelf-changer">
        <select
          defaultValue={shelf}
          onChange={(event) => {
            //过滤选中'None'
            event.target.value !== 'none' && onChangeShelf(event.target.value);
          }}
        >
          <option value="moveTo" disabled="disabled">Move to...</option>
          <option value="currentlyReading" disabled={'currentlyReading' === shelf ? 'disabled' : ''}>Currently Reading</option>
          <option value="wantToRead" disabled={'wantToRead' === shelf ? 'disabled' : ''}>Want to Read</option>
          <option value="read" disabled={'read' === shelf ? 'disabled' : ''}>Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfChange