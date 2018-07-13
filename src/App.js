import React, { Component } from 'react';
import './App.css';
import Shelf from './Shelf';
import SearchForm from './SearchForm';
import Books from './Books';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom'; 
import { Route } from 'react-router-dom';

class App extends Component {

  state = {
    books : []
  }

  addBook = (book) => {
    this.setState((prevState) => ({
      books : prevState.books.concat(book)
    }))
  }

  updateBook = (bookToBeUpdated) => {
    this.setState((prevState) => ({
      books : prevState.books.map(book => 
          {
            if (book.id === bookToBeUpdated.id) {
              book.shelf = bookToBeUpdated.shelf;
            }
            return book;
          }
        )
    }))
  }

  removeBook = (bookToBeRemoved) => {
    this.setState(prevState => (
      { books : 
        prevState.books.filter(
           book => book.id !== bookToBeRemoved.id
          )
      }
      )
    );
  }

  updateShelf = (event, book) => {
    let value = event.target.value

    if (value === 'none') {
      this.removeBook(book);
    } else {
      book.shelf = value;
      if (book.shelf === 'none') {
        this.addBook(book);
      } else {
        this.updateBook(book);
      } 
    }

    BooksAPI.update(book, value);
  }


  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books : books })) 
  }

  render() {
    let currentlyReading = [];
    let wantToRead = [];
    let read = [];

    if (global.location.pathname === '/') {
      for (let book of this.state.books) {
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
        } 
      }
    }

    return (
      <div className="app">
      
      <Route exact path="/" render={(() => (
        <div>
        <Shelf category="Currently Reading" books={currentlyReading} updateShelf={this.updateShelf} />
        <Shelf category="Want to Read" books={wantToRead} updateShelf={this.updateShelf} />
        <Shelf category="Read" books={read} updateShelf={this.updateShelf} />
        <div className="open-search">
        <Link to="/search">Add a book</Link>
        </div>
        </div>
        ))}/>
        <Route path="/search" 
        render={ () => (
          <SearchForm updateShelf={this.updateShelf} />

          )  } />
        </div>
        );
    }
  }

  export default App;
