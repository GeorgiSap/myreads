import React, { Component } from 'react';
import Books from './Books';

class Shelf extends Component {

	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.category}</h2>
				<div className="bookshelf-books">
					<Books books={this.props.books} />
				</div>
			</div>
		);
	}
}

export default Shelf;