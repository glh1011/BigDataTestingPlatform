import React, { Component } from 'react';
import UserForm from './components';

export default class EditSubUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="edit-sub-user-page">
        <UserForm />
      </div>
    );
  }
}
