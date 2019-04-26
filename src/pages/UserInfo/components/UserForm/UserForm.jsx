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
import { withRouter } from 'react-router';

const { Row, Col } = Grid;

@withRouter
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

  render() {
    const { value, handleSubmitForm, history } = this.props;
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={value}
            onChange={this.props.handleInputChange}
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>个人信息</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  登录名：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="userName" required message="必填">
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
                  <IceFormBinder name="userLevel">
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
                  <IceFormBinder name="superiorUserId">
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
                  <IceFormBinder name="name">
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

              {/* <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  密码：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder
                    name="password"
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
              </Row> */}

            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                onClick={()=>handleSubmitForm(value, history)}
              >
                确认修改
              </Button>
            </Col>

            <Col>
              <Button
                size="large"
                type="primary"
                onClick={()=>{this.props.history.goBack()}}
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
    this.props.getSelfInfo();
  }
}

const mapStateToProps = (state) => {
  return {
    value: state.userForm.value.data
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSelfInfo() {
    dispatch(actionCreators.getInfo());
  },
  handleInputChange(e) {
    console.log(e);
    dispatch(actionCreators.changeSelfInputValue(e.name, e.email));
  },
  //提交表单
  handleSubmitForm(value, history) {
    console.log("===============");
    console.log(value);
    //console.log(this.props.value);
    //e.persist();
    dispatch(actionCreators.submitForm(value.name, value.email, history));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);

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

