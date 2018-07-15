import React, { Component } from 'react';
import './App.css';
import SearchPage from './SearchPage';
import HomePage from './HomePage';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    books : []
  }

  /**
  * @description Adds book to the books state
  * @param {object} book
  */
  addBook = book => {
    this.setState(prevState => ({
          books : prevState.books.concat(book)
      })
    )
  }

 /**
  * @description Removes book from the books state
  * @param {object} book
  */
  removeBook = bookToBeRemoved => {
    this.setState(prevState => ({   
      books : 
        prevState.books.filter(book => 
          book.id !== bookToBeRemoved.id
        )
    }))
  }

 /**
  * @description Modifies books state when book's shelf is changed
  * @param {string} newShelf
  * @param {object} book
  */
  updateShelf = (newShelf, book) => {
    this.removeBook(book);
    if (newShelf !== 'none') {
       book.shelf = newShelf;
       this.addBook(book);
    }

    BooksAPI.update(book, newShelf);
  }

 /**
  * @description Gets shelf of selected book
  * @param {object} selectedBook
  * @returns {string} Shelf of selected book
  */
  getShelf = selectedBook => {
    const {books} = this.state;

    for (let index = 0; index < books.length; index++) {
      if (books[index].id === selectedBook.id) {
        return books[index].shelf;
      }
    } 
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books})) 
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <HomePage books={this.state.books}
                    updateShelf={this.updateShelf}
                    getShelf={this.getShelf} /> 
        )} />
        
        <Route path="/search" render={() => (
          <SearchPage updateShelf={this.updateShelf} 
                      getShelf={this.getShelf} />
        )} />
      </div>
    )
  }
}

export default App;
