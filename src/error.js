/**
 *
 * Error Catch from React 16
 * @author: henryhe
 * @date: 2019-02-26
 *
 */
import React, { Component } from 'react';

export default class ErrorCheck extends Component {
  state = {
    error: '',
  }


  componentDidCatch(error, info) {
    console.info(error, info, 'CATCH ERROR');
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <span role="img" arial-label="sir">👮</span>网络错误，请刷新网页。
        </div>
      );
    }

    return this.props.children;
  }
}
