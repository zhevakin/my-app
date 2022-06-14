import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import BookForm from './BookForm'
import bookType from '../types/book'

class EditBookModal extends React.Component {
  handleSubmit = (data) => {
    this.props.onSubmit(data)
  }

  render() {
    const { book, show, onHide } = this.props
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Редактирование книги</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookForm book={book} onSubmit={this.handleSubmit} />
        </Modal.Body>
      </Modal>
    )
  }
}

EditBookModal.propTypes = {
  book: bookType.isRequired,
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default EditBookModal
