import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import bookType from '../types/book'

function Book(props) {
  const { book, onDelete, onEdit } = props
  return (
    <Card>
      <Card.Body>
        <Card.Img variant="top" src={book.imageUrl} style={{ maxWidth: 200 }} />
        <Card.Title>{book.title}</Card.Title>
        <div>{book.author}</div>
        <div>
          <Button className="me-2" onClick={onEdit}>
            Редактировать
          </Button>
          <Button className="me-2">Показать комментарии</Button>
          <Button variant="danger" onClick={onDelete}>
            Удалить
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

Book.propTypes = {
  book: bookType.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default Book
