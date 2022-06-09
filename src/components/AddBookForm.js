import React from 'react'
import PropTypes from 'prop-types'

class AddBookForm extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      author: '',
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
        <div className="mb-2">
          <input type="file" ref={this.fileInputRef} />
        </div>
        <button type="submit">Добавить</button>
      </form>
    )
  }
}

AddBookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default AddBookForm
