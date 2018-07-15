import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Books from './Books';

class Shelf extends Component {

	render() {
		const { category, books, updateShelf, getShelf} = this.props

		return (
			<div className="bookshelf">
			<h2 className="bookshelf-title">{category}</h2>
			<div className="bookshelf-books">
			<Books books={books} 
			updateShelf={updateShelf} 
			getShelf={getShelf}/>
			</div>
			</div>
			);
	}
}

Shelf.propTypes = {
	category : PropTypes.string.isRequired
}

export default Shelf;