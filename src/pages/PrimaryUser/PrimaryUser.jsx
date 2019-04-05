import React, { Component } from 'react';
import AuthorityTable from './components/AuthorityTable';

export default class PrimaryUser extends Component {
  static displayName = 'PrimaryUser';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="primary-user-page">
        <AuthorityTable />
      </div>
    );
  }
}
