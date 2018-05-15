import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { AddNote } from './AddNote';

class NoteList extends Component {
  state = {
    notes: [{ title: 'sample Title', content: 'Sample Content', id: '23412' }],
    addedNote: false,
    user: '',
    title: '',
    content: ''
  };

  componentDidMount() {
    this.getNotes();
    console.log(this.props.user);
  }

  componentDidUpdate(oldProps, prevState) {
    if (this.state.addedNote) {
      this.getNotes();
      this.setState({
        ...this.state,
        addedNote: false
      });
    }
  }

  submitNote = event => {
    event.preventDefault();
    axios
      .post(
        'http://127.0.0.1:8000/api/notes/',
        {
          title: this.state.title,
          content: this.state.content
        },
        {
          headers: {
            Authorization: `Token ${this.props.user}`
          }
        }
      )
      .then(({ data }) => {
        this.setState({
          ...this.state,
          addedNote: true
        });
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

  getNotes = () => {
    axios
      .get('http://127.0.0.1:8000/api/notes/', {
        headers: { Authorization: `Token ${this.props.user}` }
      })
      .then(({ data }) => {
        this.setState({
          notes: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
          <AddNote
            title={this.state.title}
            content={this.state.content}
            submitNote={this.submitNote}
            inputChangeHandler={this.inputChangeHandler}
          />
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
              <Link to={`/notes/${this.props.id}`}>
                <Button>...</Button>
              </Link>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, null)(NoteList);
