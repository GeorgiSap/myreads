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
    books: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({query: query})
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books : books }))  
  }

  render() {
    let currentlyReading = [];
    let wantToRead = [];
    let read = [];

    this.state.books.forEach((book) => {
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
    })

    return (
      <div className="app">
      
        <Route exact path="/" render={(() => (
          <div>
            <Shelf category="Currently Reading" books={currentlyReading} />
            <Shelf category="Want to Read" books={wantToRead} />
            <Shelf category="Read" books={read} />
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
        ))}/>

        <Route path="/search" render={() => (
          <div>
            <SearchForm updateQuery={this.updateQuery} query={this.state.query} />
            <div className="search-books-results">
              <Books books= {this.state.books} />
            </div>
          </div>
        )}/>

      </div>
    );
  }
}

export default App;
