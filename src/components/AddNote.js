import React, { Component } from 'react';

export const AddNote = props => {
  return (
    <div>
      <h3>Add New Note</h3>
      <form onSubmit={e => props.submitNote(e)}>
        <div>
          <label htmlFor="title">Title:</label>
        </div>
        <input
          name="title"
          id="title"
          value={props.title}
          onChange={props.inputChangeHandler}
        />
        <div>
          <label htmlFor="content">Content:</label>
        </div>
        <textarea
          name="content"
          id="content"
          value={props.content}
          onChange={props.inputChangeHandler}
        />
        <div>
          <button>submit</button>
        </div>
      </form>
    </div>
  );
};
