import React, { Component } from 'react';
import Books from './Books';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom'; 

class SearchForm extends Component {

  state = {
    query: '',
    searchBookResults: []
  }

  updateSearchBookResults = (query) => {
    if (query) {
      BooksAPI.search(query).then(books => this.setState({searchBookResults : books })) 
    } else {
      this.setState({searchBookResults : null })
    }
  }

  updateQueryString = (query) => {
     this.setState({query: query})
  }

  updateQuery = (query) => {
    this.updateQueryString(query);
    this.updateSearchBookResults(query);
  }

  clearQuery = () => {
    this.setState({query : ''})
  }

	render() {
		return (
      <div>
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input 
                      type="text" 
                      placeholder="Search by title or author"
                      value={this.state.query}
                      onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
              </div>
            </div>
            <div className="search-books-results">
             {this.state.searchBookResults && this.state.searchBookResults.length > 0 &&
                (<Books books= {this.state.searchBookResults} 
                        updateShelf={this.props.updateShelf} 
                        getShelf={this.props.getShelf}/>)
              }
            </div>
        </div>
		);
	}
}

export default SearchForm;