import React, { Component } from 'react';
import DetailTable from './components';

export default class SubUserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="sub-user-detail-page">
        <DetailTable />
      </div>
    );
  }
}
