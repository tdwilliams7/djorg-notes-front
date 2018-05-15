import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import AddNote from './AddNote';

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
      <Row>
        <Col sm="9">
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
        </Col>
        <Col>
          <AddNote />
        </Col>
      </Row>
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
              <Link to={`/${this.props.id}`}>
                <Button>...</Button>
              </Link>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}
