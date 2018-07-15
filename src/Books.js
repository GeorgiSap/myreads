import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Books extends Component {

	render () {
		return (
			<ol className="books-grid">
				{this.props.books.map(book => (
					<Book key={book.id} book={book} updateShelf={this.props.updateShelf} 
					getShelf={this.props.getShelf}/>
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