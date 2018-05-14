import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

import NoteList from './components/NoteList';
import AddNote from './components/AddNote';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container fluid>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Row>
            <Col sm="6" md="9">
              <NoteList />
            </Col>
            <Col>
              <AddNote />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
