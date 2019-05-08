import React, { Component } from 'react';
import LogTable from './LogTable';

export default class PlatformLogTable extends Component {
  static displayName = 'PlatformLogTable';

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
