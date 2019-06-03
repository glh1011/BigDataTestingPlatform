import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './scss/dark.scss';
import './scss/light.scss';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className='logo' style={{}}>
        {/* <Link to="/" className="logo-text"> */}
          <img src="../../../../../public/logo2.png" style={{width:"160px"}} />
        {/* </Link> */}
      </div>
    );
  }
}
