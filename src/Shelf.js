import React, { Component } from 'react';
import Books from './Books';

class Shelf extends Component {

	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.category}</h2>
				<div className="bookshelf-books">
					<Books books={this.props.books} 
					updateShelf={this.props.updateShelf} 
					getShelf={this.props.getShelf}/>
				</div>
			</div>
		);
	}
}

export default Shelf;