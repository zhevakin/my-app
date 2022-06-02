import React from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'

import './App.css'

import Book from './components/Book'
import AddBookForm from './components/AddBookForm'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      books: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = () => {
    this.setState({ isLoading: true })

    axios.get('https://nordic-books-api.herokuapp.com/books').then((res) => {
      this.setState({
        books: res.data.data,
        isLoading: false,
      })
    })
  }

  handleBookSubmit = (data) => {
    const { title, author } = data
    const formData = new FormData()
    formData.append('author', author)
    formData.append('title', title)

    fetch('https://nordic-books-api.herokuapp.com/books', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        this.getBooks()
      })
  }

  render() {
    const { isLoading } = this.state
    return (
      <div className="container py-3">
        <h1>Электронная библиотека</h1>
        <AddBookForm onSubmit={this.handleBookSubmit} />

        {isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <div>
            {this.state.books.map((book) => (
              <div key={book._id} className="mb-3">
                <Book book={book} />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default App
