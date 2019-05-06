import React, { Component } from 'react';
import PermissionForm from './components';

export default class EditSubUserPermission extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="edit-sub-user-page">
        <PermissionForm />
      </div>
    );
  }
}
