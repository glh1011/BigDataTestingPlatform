import React, { Component } from 'react';
import SelectableTable from './components';

export default class AuthorityManage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="authority-manage-page">
        {/* 可批量操作的表格 */}
        <SelectableTable />
      </div>
    );
  }
}
