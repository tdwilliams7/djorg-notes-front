import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from './store/actions/userActions';
import logo from './logo.svg';
import './App.css';

import NoteList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import Auth from './components/Auth';

class App extends Component {
  state = {
    user: ''
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Container fluid>
            <header className="App-header">
              <Link to="/">
                <img src={logo} className="App-logo" alt="logo" />
              </Link>
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <Switch>
              <Route
                path="/notes/:id"
                component={NoteDetail}
                user={this.props.user}
              />
              <Route
                exact
                path="/notes"
                component={NoteList}
                user={this.props.user}
              />
              <Route path="/" component={Auth} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { login })(App);
