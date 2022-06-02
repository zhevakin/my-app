import React from 'react'

class AddBookForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      author: '',
    }
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
    const data = { title, author }
    this.props.onSubmit(data)

    this.setState({
      title: '',
      author: '',
    })
  }

  render() {
    const { title, author } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Добавление книги</h3>
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
        <button type="submit">Добавить</button>
      </form>
    )
  }
}

export default AddBookForm
