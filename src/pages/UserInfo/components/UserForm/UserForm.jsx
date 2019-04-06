/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder/lib';
import store from '../../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { actionCreators } from '../../store/';

const { Row, Col } = Grid;
class UserForm extends Component {
  static displayName = 'UserForm';

  static propTypes = {};

  static defaultProps = {};

  checkPasswd = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 8) {
      callback('密码必须大于8位');
    } else if (values.length > 16) {
      callback('密码必须小于16位');
    } else {
      callback();
    }
  };

  checkPasswd2 = (rule, values, callback, stateValues) => {
    console.log('stateValues:', stateValues);
    if (values && values !== stateValues.passwd) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };

  // formChange = (value) => {
  //   this.setState({
  //     value,
  //   });
  // };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('values', values);
    });
  };

  render() {
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={this.props.value}
            onChange={this.props.handleInputChange}
            // onChange={this.formChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>个人信息</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  登录名：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="username" required message="必填">
                    <Input
                      size="large"
                      style={{ width: '100%' }}
                      disabled 
                    />
                  </IceFormBinder>
                  <IceFormError name="username" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  用户等级：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="userRank">
                  <Input
                      size="large"
                      style={{ width: '100%' }}
                      disabled 
                    />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  上级id：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="upperId">
                  <Input
                      size="large"
                      style={{ width: '100%' }}
                      disabled 
                    />
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  姓名：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="displayName">
                    <Input
                      size="large"
                      placeholder="请输入昵称"
                      style={{ width: '100%' }}
                      
                    />
                  </IceFormBinder>
                  <IceFormError name="displayName" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  邮箱：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    type="email"
                    name="email"
                    required
                    message="请输入正确的邮箱"
                  >
                    <Input
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="ice-admin@alibaba-inc.com"
                    />
                  </IceFormBinder>
                  <IceFormError name="email" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  密码：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="passwd"
                    required
                    validator={this.checkPasswd}
                  >
                    <Input
                      style={{ width: '100%' }}
                      htmlType="password"
                      size="large"
                      placeholder="请重新输入新密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="passwd" />
                </Col>
              </Row>

            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                // onClick={this.validateAllFormField}
                onClick={this.props.handleSubmitForm}
              >
                确认修改
              </Button>
            </Col>

            <Col>
              <Button
                size="large"
                type="primary"
                onClick={this.validateAllFormField}
              >
                取消
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
  componentDidMount() {
    axios.get('./mock/userInfo.json').then((res) => {
      const result = res.data.data;
      console.log(result);
      const action = {
        type: 'display_user_info',
        data: result
      }
      console.log(action);
      this.props.displayInfo(action);
    })
  }
}

const mapStateToProps = (state) => {
  return {
    // username: state.userForm.username
    value: state.userForm.value
  }
}

//store.dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    displayInfo(action) {
      dispatch(action);
    },
    handleInputChange(e) {
      //const action = constants.CHANGEINPUTVALUE;
      // const action = {
      //   type: constants.CHANGEINPUTVALUE,
      //   // displayName: e.displayName,
      //   // passwd: e.passwd,
      //   // email: e.email
      //   value: e
      // }
      dispatch(actionCreators.changeInputValue);
    },
    //提交表单
    handleSubmitForm(e, value) {
      e.persist();
      dispatch(actionCreators.submitForm(value));
    }
  }
}

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    marginBottom: 25,
  },
  formLabel: {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'right',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);