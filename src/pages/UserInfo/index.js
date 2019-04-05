import React, { Component } from 'react';
import UserForm from './components/UserForm';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-info-page">
        <UserForm />
      </div>
    );
  }
}
