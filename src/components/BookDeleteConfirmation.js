import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class BookDeleteConfirmation extends React.Component {
  render() {
    const { show, onHide, onConfirm } = this.props

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Удаление книги</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Вы уверены?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Отмена
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

BookDeleteConfirmation.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default BookDeleteConfirmation
