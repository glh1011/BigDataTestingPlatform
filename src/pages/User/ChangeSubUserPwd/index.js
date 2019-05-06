import React, { Component } from 'react';
import ChangePasswordForm from './components';

export default class ChangeSubUserPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="change-self-pwd-page">
        <ChangePasswordForm />
      </div>
    );
  }
}
