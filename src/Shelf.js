import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class Shelf extends Component {

	state = {
		books : []
	}

	componentDidMount() {
		BooksAPI.getAll().then(books => this.setState({books : books }))	
	}

	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">Currently Reading</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.state.books.map(book => (
						<li key={book.id}>
							<Book book={book} />
						</li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default Shelf;