import React, { Component } from 'react';
import LiteTable from './components';

export default class SelfAuthorities extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="self-authorities-page">
        {/* 简单的附带状态的表格 */}
        <LiteTable />
      </div>
    );
  }
}
