import React, { Component } from 'react';
import ChangePasswordForm from './components';

export default class ChangeSelfPwd extends Component {
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
