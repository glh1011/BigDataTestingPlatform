import React, { PureComponent } from 'react';

import './scss/dark.scss';
import './scss/light.scss';

export default class Logo extends PureComponent {
  render() {
    return (
      // <div style={styles.container}></div>
      <div></div>
    );
  }
}

const styles = {
  container: {
    backgroundImage: `url(${require('../../images/logo2.png')})`,
    backgroundSize: 'cover',
    width:"200px",
    height: '50px'
  }
}