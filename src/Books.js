import React, { Component } from 'react';
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

export default Books;