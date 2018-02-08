/**
 * Created by yth on 2018/2/7.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import InputBoxItems from './InputBoxItems'
import searchTerm from './static/SEARCH_TERMS.md'

class InputBox extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired
  }

  state = {
    query: '',
    itemsDisplay: false,
    items: [],
    terms: []
  }

  constructor(props) {
    super(props)
    fetch(searchTerm).then((response) => {
      return response.text()
    }).then(text => {
      this.state.terms = text.trim().replace(/'/g, "").split(', ')
    })
  }

  updateQuery = (query) => {
    let showingItems = []
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingItems = this.state.terms.filter(term => match.test(term))
      showingItems.sort()
    }
    this.setState({
      query: query.trim(),
      itemsDisplay: !!query,
      items: showingItems.slice(0, 5)
    })
  }

  clickItem = (value) => {
    this.setState({
      query: value,
      itemsDisplay: false
    })
    this.props.onSearch(value)
  }

  render() {
    return(
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          value={this.state.query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        <InputBoxItems
          display={this.state.itemsDisplay}
          items={this.state.items}
          onClickItem={this.clickItem}
        />
      </div>
    )
  }
}

export default InputBox