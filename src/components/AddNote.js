import React, { Component } from 'react';

export default class AddNote extends Component {
  state = {
    title: '',
    content: ''
  };

  submitNote = event => {
    event.preventDefault();
    console.log('submitted note');
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    return (
      <div>
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
