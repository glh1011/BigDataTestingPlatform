import React, { Component } from 'react';
import SecondaryUserTable from './components/secondaryUser';

import './SecondaryUser.scss';

export default class SecondaryUser extends Component {
  static displayName = 'SecondaryUser';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="secondaryUser-page">
        <SecondaryUserTable />
      </div>
    );
  }
}
