import React, { Component } from 'react';
import LogTable from './LogTable';

export default class CDHLogTable extends Component {
  static displayName = 'CDHLogTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <LogTable />
      </div>
    );
  }
}

const styles = {};
