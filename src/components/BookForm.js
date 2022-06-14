import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import bookType from '../types/book'

class BookForm extends React.Component {
  constructor(props) {
    super()
    this.state = {
      title: props.book ? props.book.title : '',
      author: props.book ? props.book.author : '',
    }
    this.fileInputRef = React.createRef()
  }

  handleFieldChange = (event) => {
    const fieldName = event.target.name
    const fieldValue = event.target.value
    this.setState({
      [fieldName]: fieldValue,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { title, author } = this.state
    const data = { title, author, file: this.fileInputRef.current.files[0] }

    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(data)
    }

    this.setState({
      title: '',
      author: '',
    })
  }

  render() {
    const { book, submitButtonText } = this.props
    const { title, author } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-2">
          <input
            name="title"
            placeholder="Название книги"
            type="text"
            value={title}
            onChange={this.handleFieldChange}
          />
        </div>
        <div className="mb-2">
          <input
            name="author"
            placeholder="Автор книги"
            type="text"
            value={author}
            onChange={this.handleFieldChange}
          />
        </div>
        <div className="mb-2">
          {book && (
            <div className="mb-2">
              <img src={book.imageUrl} style={{ maxWidth: 200 }} alt="" />
            </div>
          )}
          <input type="file" ref={this.fileInputRef} />
        </div>
        <Button type="submit">{submitButtonText}</Button>
      </form>
    )
  }
}

BookForm.propTypes = {
  book: bookType,
  submitButtonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
}

BookForm.defaultProps = {
  submitButtonText: 'Сохранить',
}

export default BookForm
