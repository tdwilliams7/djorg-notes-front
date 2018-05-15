import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

class NoteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: { title: '', content: '', id: '' },
      user: ''
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`http://127.0.0.1:8000/api/notes/${id}`, {
        headers: { Authorization: `Token ${this.props.user}` }
      })
      .then(({ data }) => {
        this.setState({
          note: {
            title: data.title,
            content: data.content,
            id: data.id
          }
        });
      })
      .catch(err => console.log(err));
  }

  deleteHandler = () => {
    const { id } = this.props.match.params;
    axios
      .delete(`http://127.0.0.1:8000/api/notes/${id}`, {
        headers: { Authorization: `Token ${this.props.user}` }
      })
      .then(succ => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  submitNote = event => {
    event.preventDefault();
    const { id } = this.props.match.params;
    axios
      .put(
        `http://127.0.0.1:8000/api/notes/${id}/`,
        {
          title: this.state.note.title,
          content: this.state.note.content
        },
        {
          headers: { Authorization: `Token ${this.props.user}` }
        }
      )
      .then(({ data }) => {
        this.setState({
          note: {
            title: data.title,
            content: data.content,
            id: data.id
          }
        });
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      note: {
        ...this.state.note,
        [target.name]: target.value
      }
    });
  };

  render() {
    return (
      <Row>
        <Col sm="9">
          <h3>{this.state.note.title}</h3>
          <p>{this.state.note.content}</p>
          <button onClick={this.deleteHandler}>Delete</button>
        </Col>
        <Col>
          <div>
            <h3>Edit Note</h3>
            <form onSubmit={this.submitNote}>
              <div>
                <label htmlFor="title">Title:</label>
              </div>
              <input
                name="title"
                id="title"
                value={this.state.note.title}
                onChange={this.inputChangeHandler}
              />
              <div>
                <label htmlFor="content">Content:</label>
              </div>
              <textarea
                name="content"
                id="content"
                onChange={this.inputChangeHandler}
                value={this.state.note.content}
              />
              <div>
                <button>submit</button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps, null)(NoteDetail));
