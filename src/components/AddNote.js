import React, { Component } from 'react';
import axios from 'axios';

export default class AddNote extends Component {
  state = {
    title: '',
    content: ''
  };

  submitNote = event => {
    event.preventDefault();
    console.log('submitted note');
    axios
      .post('http://127.0.0.1:8000/api/notes/', {
        title: this.state.title,
        content: this.state.content
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    return (
      <div>
        <h3>Add New Note</h3>
        <form onSubmit={this.submitNote}>
          <div>
            <label htmlFor="title">Title:</label>
          </div>
          <input name="title" id="title" onChange={this.inputChangeHandler} />
          <div>
            <label htmlFor="content">Content:</label>
          </div>
          <textarea
            name="content"
            id="content"
            onChange={this.inputChangeHandler}
          />
          <div>
            <button>submit</button>
          </div>
        </form>
      </div>
    );
  }
}
