import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

class SearchForm extends Component {

	render() {
		return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  {JSON.stringify(this.props.query)}
                    <input 
                      type="text" 
                      placeholder="Search by title or author"
                      value={this.props.query} 
                      onChange={(event) => this.props.updateQuery(event.target.value)}
                    />
                </div>
              </div>
            </div>
		);
	}
}

export default SearchForm;