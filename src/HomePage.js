import React, { Component } from 'react';
import Shelf from './Shelf';
import { Link } from 'react-router-dom'; 

class HomePage extends Component {
	render() {
		const {updateShelf, getShelf, books} = this.props;

		let currentlyReading = [],
			wantToRead = [],
			read = [];

		for (let book of books) {
			if (book.shelf === 'currentlyReading')
				currentlyReading.push(book);
			if (book.shelf === 'wantToRead')
				wantToRead.push(book);
			if (book.shelf === 'read')
				read.push(book);
		}

		return (
			<div className="list-books">
	            <div className="list-books-title">
              		<h1>MyReads</h1>
            	</div>
            	<div className="list-books-content">
	            <Shelf category="Currently Reading" 
	                   books={currentlyReading} 
	                   updateShelf={updateShelf}
	                   getShelf={getShelf} />

	            <Shelf category="Want to Read" 
	                   books={wantToRead} 
	                   updateShelf={updateShelf} 
	                   getShelf={getShelf} />

	            <Shelf category="Read" 
	                   books={read} 
	                   updateShelf={updateShelf} 
	                   getShelf={getShelf} />
	            </div>      
	            <div className="open-search">
	              <Link to="/search">Add a book</Link>
              	</div>
          	</div>
		)
	}
}

export default HomePage;