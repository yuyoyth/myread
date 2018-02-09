/**
 * Created by yth on 2018/2/7.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BookImage extends Component {
  /**
   * 书籍封面组件
   * @param imageUrl 图片链接
   * @type {{imageUrl: (string)}}
   */
  static propTypes = {
    imageUrl: PropTypes.string.isRequired
  };

  render() {
    return(
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 188,
          backgroundImage: `url("${this.props.imageUrl}")`
        }}/>
    )
  }
}

export default BookImage