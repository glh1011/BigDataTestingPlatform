import React, { Component } from 'react';
import EditAuthorityForm from './components/EditAuthorityForm';

export default class EditAuthority extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="edit-authority-page">
        <EditAuthorityForm />
      </div>
    );
  }
}
