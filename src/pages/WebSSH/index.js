import React, { Component } from 'react';
import ColumnForm from './components/ColumnForm';

export default class WebSSH extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="web-ssh-page">
        <ColumnForm />
      </div>
    );
  }
}
