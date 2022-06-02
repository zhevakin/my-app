import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function Book(props) {
  const { book } = props
  return (
    <Card>
      <Card.Body>
        <Card.Img variant="top" src={book.imageUrl} style={{ maxWidth: 200 }} />
        <Card.Title>{book.title}</Card.Title>
        <div>{book.author}</div>
        <div>
          <Button className="me-2">Редактировать</Button>
          <Button className="me-2">Показать комментарии</Button>
          <Button variant="danger">Удалить</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Book
