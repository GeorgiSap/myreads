import React, { Component } from 'react';
import './App.css';
import Shelf from './Shelf';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom'; 
import { Route } from 'react-router-dom';

class App extends Component {

  state = {
    books : []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books : books }))  
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={(() => (
          <div>
            <Shelf category="Currently Reading" books={this.state.books} />
            <Shelf category="Want to Read" books={this.state.books} />
            <Shelf category="Read" books={this.state.books} />
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
        ))}/>
        <Route path="/search" render={(() => (
            <div>
              <Shelf category="None" books={this.state.books} />
            </div>
        ))}/>
      </div>
    );
  }
}

export default App;
