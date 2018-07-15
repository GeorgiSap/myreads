import React, { Component } from 'react';
import Shelf from './Shelf';
import { Link } from 'react-router-dom'; 

class HomePage extends Component {
	render() {
		const {updateShelf, getShelf, books} = this.props;

		let currentlyReading = [];
		let wantToRead = [];
		let read = [];

		for (let book of books) {
			switch(book.shelf) {
				case 'currentlyReading':
					currentlyReading.push(book);
					break;
				case 'wantToRead':
					wantToRead.push(book);
					break;
				case 'read':
					read.push(book);
					break;
				default:
					break;
			} 
		}

		return (
			<div>
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

	            <div className="open-search">
	              <Link to="/search">Add a book</Link>
	            </div>
            </div>
		)
	}
}

export default HomePage;