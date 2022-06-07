import React from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './App.css'

import Book from './components/Book'
import AddBookForm from './components/AddBookForm'

const apiUrl = 'https://nordic-books-api.herokuapp.com'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      books: [],
      isLoading: false,
      isDeleteModalActive: false,
    }
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = () => {
    this.setState({ isLoading: true })

    axios.get(`${apiUrl}/books`).then((res) => {
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

    fetch(`${apiUrl}/books`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        this.getBooks()
      })
  }

  handleBookDelete = (bookId) => {
    this.setState({
      isDeleteModalActive: true,
      bookId,
    })
  }

  handleDeleteModalHide = () => {
    this.setState({
      isDeleteModalActive: false,
    })
  }

  handleDeleteConfirm = () => {
    const { bookId } = this.state

    fetch(`${apiUrl}/books/${bookId}`, {
      method: 'DELETE',
    }).then(() => {
      this.handleDeleteModalHide()
      this.getBooks()
    })
  }

  render() {
    const { isLoading, isDeleteModalActive } = this.state
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
                <Book
                  book={book}
                  onDelete={() => this.handleBookDelete(book._id)}
                />
              </div>
            ))}
          </div>
        )}

        <Modal show={isDeleteModalActive} onHide={this.handleDeleteModalHide}>
          <Modal.Header closeButton>
            <Modal.Title>Удаление книги</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Вы уверены?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleDeleteModalHide}>
              Отмена
            </Button>
            <Button variant="danger" onClick={this.handleDeleteConfirm}>
              Удалить
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default App
