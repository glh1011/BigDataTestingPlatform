import React, { Component } from 'react';
import UserForm from './components/UserForm';

export default class AddSubUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="add-sub-user-page">
        <UserForm />
      </div>
    );
  }
}
