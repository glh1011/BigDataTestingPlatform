import React, { Component } from 'react';
import PrimaryUserTable from './components/primaryUser';

import './PrimaryUser.scss';

export default class PrimaryUser extends Component {
  static displayName = 'PrimaryUser';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="primaryUser-page">
        <PrimaryUserTable />
      </div>
    );
  }
}
