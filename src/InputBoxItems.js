/**
 * Created by yth on 2018/2/7.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class InputBoxItems extends Component {
  static propTypes = {
    display: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    onClickItem: PropTypes.func.isRequired
  }

  clickItem(obj) {
    let value = obj.getAttribute('data-value')
    this.props.onClickItem(value)
  }

  render() {
    const {items, onClickItem} = this.props
    return(
      <div className="search-books-bomb" style={{height: 'auto', display: this.props.display ? 'block' : 'none'}}>
        <ul>
          {items.map(v => (
            <li
              key={v}
              className="search-books-bomb-item"
              data-value={v}
              onClick={(event) => {
                onClickItem(event.target.getAttribute('data-value'))
              }}
            >{v}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default InputBoxItems