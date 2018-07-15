import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Books extends Component {

	render () {

	const {books, getShelf, updateShelf} = this.props;

		return (
			<ol className="books-grid">
				{books.map(book => (
					<Book key={book.id} book={book} updateShelf={updateShelf} 
					getShelf={getShelf}/>
				))}
			</ol>
		);
	}
}

Books.propTypes = {
	books : PropTypes.array.isRequired,
	updateShelf : PropTypes.func.isRequired,
	getShelf : PropTypes.func.isRequired
}

export default Books;