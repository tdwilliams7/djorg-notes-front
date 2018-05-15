import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/actions/userActions';
import { withRouter } from 'react-router-dom';

class Auth extends Component {
  state = {
    username: '',
    password: '',
    signedIn: false,
    user: ''
  };

  componentDidMount() {
    if (!this.props.user.length) {
      const token = window.localStorage.getItem('Authorization');
      this.props.login(null, null, token);
    }
    if (this.props.signedIn) {
      this.props.history.push('/notes');
    }
  }

  componentDidUpdate(oldProps, newProps) {
    if (oldProps.signedIn === false && this.props.signedIn === true) {
      this.props.history.push('/notes');
    }
  }

  inputChangeHandler = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    return (
      <div>
        <form>
          <h1>Username</h1>
          <input
            name="username"
            value={this.state.username}
            onChange={this.inputChangeHandler}
          />
          <h1>Password</h1>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.inputChangeHandler}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signedIn: state.signedIn,
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps, { login })(Auth));
