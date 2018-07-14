import React, { Component } from 'react';
import './App.css';
import Shelf from './Shelf';
import SearchForm from './SearchForm';
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

  removeBook = (bookToBeRemoved) => {
    this.setState(prevState => (
      { books : prevState.books.filter(
         book => book.id !== bookToBeRemoved.id
        )
      }
      )
    );
  }

  updateShelf = (value, book) => {
    this.removeBook(book);
    if (value !== 'none') {
       book.shelf = value;
       this.addBook(book);
    }

    BooksAPI.update(book, value);
  }


  getShelf = (selectedBook) => {
    for (let index = 0; index < this.state.books.length; index++) {
      if (this.state.books[index].id === selectedBook.id) {
        return this.state.books[index].shelf;
      }
    } 
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
          default:
          break;
        } 
      }
    }

    return (
      <div className="app">
      
      <Route exact path="/" render={(() => (
        <div>
        <Shelf category="Currently Reading" books={currentlyReading} updateShelf={this.updateShelf} getShelf={this.getShelf} />
        <Shelf category="Want to Read" books={wantToRead} updateShelf={this.updateShelf} getShelf={this.getShelf} />
        <Shelf category="Read" books={read} updateShelf={this.updateShelf} getShelf={this.getShelf} />
        <div className="open-search">
        <Link to="/search">Add a book</Link>
        </div>
        </div>
        ))}/>
        <Route path="/search" 
        render={ () => (
          <SearchForm updateShelf={this.updateShelf} getShelf={this.getShelf} />

          )  } />
        </div>
        );
    }
  }

  export default App;
