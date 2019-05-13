/**
 *
 * Error Catch from React 16
 * @author: henryhe
 * @date: 2019-02-26
 *
 */
import React, { Component } from 'react';
import BasicException from './components/BasicException';


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
        <BasicException />
      );
    }

    return this.props.children;
  }
}
