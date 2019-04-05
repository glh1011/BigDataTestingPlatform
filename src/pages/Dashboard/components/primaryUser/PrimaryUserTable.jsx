import React, { Component } from 'react';
import TableFilter from './TableFilter';
import CustomTable from './CustomTable';

export default class PrimaryUser extends Component {
  static displayName = 'PrimaryUser';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <TableFilter />
        <CustomTable />
      </div>
    );
  }
}

const styles = {};
