import React, { Component } from 'react';
import SettingsForm from './components';

export default class AddAuthority extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="add-authority-page">
        <SettingsForm />
      </div>
    );
  }
}
