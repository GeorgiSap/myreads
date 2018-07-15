import React, { Component } from 'react';
import Books from './Books';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom'; 

class SearchPage extends Component {
  state = {
    query: '',
    searchBookResults: []
  }

  updateSearchBookResults = query => {
    if (query) {
      BooksAPI.search(query).then(books => this.setState({searchBookResults : books }));
    } else {
      this.setState({searchBookResults : null});
    }
  }

  updateQueryString = query => {
     this.setState({query});
  }

  updateQuery = query => {
    this.updateQueryString(query);
    this.updateSearchBookResults(query);
  }

	render() {
    const {getShelf, updateShelf} = this.props;
    const {searchBookResults, query} = this.state;

		return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
                <input type="text" 
                       placeholder="Search by title or author"
                       value={query}
                       onChange={event => this.updateQuery(event.target.value)}
                />
            </div>
          </div>
        </div>
        <div className="search-books-results">
         {searchBookResults && searchBookResults.length > 0 &&
            (<Books books= {searchBookResults} 
                    updateShelf={updateShelf} 
                    getShelf={getShelf}/>)
          }
        </div>
      </div>
		);
	}
}

export default SearchPage;