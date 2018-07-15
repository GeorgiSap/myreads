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

  addBook = book => {
    this.setState(prevState => ({
          books : prevState.books.concat(book)
      })
    )
  }

  removeBook = bookToBeRemoved => {
    this.setState(prevState => ({   
      books : 
        prevState.books.filter(book => 
          book.id !== bookToBeRemoved.id
        )
    }))
  }

  updateShelf = (value, book) => {
    this.removeBook(book);
    if (value !== 'none') {
       book.shelf = value;
       this.addBook(book);
    }

    BooksAPI.update(book, value);
  }

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
