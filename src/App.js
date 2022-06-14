import React from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'

import './App.css'

import Book from './components/Book'
import BookForm from './components/BookForm'
import BookDeleteConfirmation from './components/BookDeleteConfirmation'
import EditBookModal from './components/EditBookModal'

const apiUrl = 'https://nordic-books-api.herokuapp.com'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      editBook: null,
      books: [],
      isLoading: false,
      isDeleteModalActive: false,
      isEditModalActive: false,
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
    const { title, author, file } = data
    const formData = new FormData()
    formData.append('author', author)
    formData.append('title', title)
    formData.append('cover', file)

    fetch(`${apiUrl}/books`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        this.getBooks()
      })
  }

  // Удаление книги
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

  // Редактирование книги
  handleBookEdit = (book) => {
    this.setState({
      isEditModalActive: true,
      editBook: book,
    })
  }

  handleEditModalHide = () => {
    this.setState({
      editBook: null,
      isEditModalActive: false,
    })
  }

  handleEditBookSubmit = (data) => {
    const { title, author, file } = data
    const { editBook } = this.state
    const formData = new FormData()
    formData.append('author', author)
    formData.append('title', title)
    formData.append('cover', file)

    fetch(`${apiUrl}/books/${editBook._id}`, {
      method: 'PUT',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        this.getBooks()
        this.handleEditModalHide()
      })
  }

  render() {
    const { editBook, isLoading, isDeleteModalActive, isEditModalActive } =
      this.state
    return (
      <div className="container py-3">
        <h1>Электронная библиотека</h1>
        <h3>Добавление книги</h3>
        <BookForm
          onSubmit={this.handleBookSubmit}
          submitButtonText="Добавить"
        />

        {isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <div>
            {this.state.books.map((book) => (
              <div key={book._id} className="mb-3">
                <Book
                  book={book}
                  onDelete={() => this.handleBookDelete(book._id)}
                  onEdit={() => this.handleBookEdit(book)}
                />
              </div>
            ))}
          </div>
        )}

        <BookDeleteConfirmation
          show={isDeleteModalActive}
          onHide={this.handleDeleteModalHide}
          onConfirm={this.handleDeleteConfirm}
        />

        {editBook && (
          <EditBookModal
            book={editBook}
            show={isEditModalActive}
            onHide={this.handleEditModalHide}
            onSubmit={this.handleEditBookSubmit}
          />
        )}
      </div>
    )
  }
}

export default App
