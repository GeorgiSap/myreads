import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

	state = {
		shelf : this.props.book.shelf ? this.props.book.shelf : 'none'
	}

	getShelf = (value, book) => {
		let shelf = this.props.getShelf(book)
		this.setState({ shelf });
	}

	render () {
		const { book, updateShelf } = this.props;

		return ( <li key={book.id}>
		<div className="book">
		<div className="book-top">
		<div className="book-cover" style={{ width: 128, height: 192, 
			backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`}}>
			</div>
			<div className="book-shelf-changer">
			<select onChange={event => updateShelf(event.target.value, book)}
			onMouseEnter={event => this.getShelf(event.target.value, book)}
			value={this.state.shelf}
			>
			<option value="move" disabled>Move to...</option>
			<option value="currentlyReading">Currently Reading</option>
			<option value="wantToRead">Want to Read</option>
			<option value="read">Read</option>
			<option value="none">None</option>
			</select>
			</div>
			</div>		
			<div className="book-title">{book.title}</div>
			<div className="book-authors">{book.author}</div>
			</div>
			</li>
			)
		}
	}

	Book.propTypes = {
	 	book: PropTypes.shape({
      	id: PropTypes.string.isRequired,
      	title: PropTypes.string.isRequired,
      	author: PropTypes.array,
      	imageLinks: PropTypes.object
    	})
	}

	export default Book;