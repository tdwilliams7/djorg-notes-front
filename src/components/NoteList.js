import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import axios from 'axios';

export default class NoteList extends Component {
  state = {
    notes: [{ title: 'sample Title', content: 'Sample Content', id: '23412' }]
  };

  componentDidMount() {
    axios
      .get('http://127.0.0.1:8000/api/notes/')
      .then(({ data }) => {
        this.setState({
          notes: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {this.state.notes.map(note => {
          return (
            <NoteCard
              key={note.id}
              title={note.title}
              body={note.content}
              id={note.id}
            />
          );
        })}
      </div>
    );
  }
}

class NoteCard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div>
        <Card>
          <div onClick={this.toggle}>
            <h3>{this.props.title}</h3>
          </div>
          <Collapse isOpen={this.state.collapse}>
            <CardBody>
              <p>{this.props.body}</p>
              <Button>...</Button>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}
