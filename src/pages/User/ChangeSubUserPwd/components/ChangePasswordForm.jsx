/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Feedback } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './ChangePasswordForm.scss';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { withRouter } from 'react-router';

const { Row, Col } = Grid;

@withRouter
class ChangePasswordForm extends Component {
  
  componentWillUnmount(){
    this.props.resetForm();
  }
  
  handleSubmit = (inputValue, history) => {
    this.formRef.validateAll((error, value) => {
      if (!error || error.length === 0) {
        this.props.resetPwd(inputValue, history)
      }
      else {
        console.log(error);
        Feedback.toast.error("密码不能为空!");
      }
    });
  }

  checkConfirmPassword=(rule, values, callback) => {
    if (!values) {
      callback('请输入正确的密码');
    } else if (values && values !== this.props.value.passwd) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  }

  render() {
    console.log(this.props.history);
    const { value, resetPwd, formChange, history } = this.props;
    return (
      <div className="change-password-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={value}
            onChange={formChange}
            ref={(formRef) => {
              this.formRef = formRef;
            }}
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>重置下级用户密码</h2>

              <Row wrap style={styles.formItem}>
                <Col xxs="7" s="4" l="3" style={styles.formLabel}>
                  原始密码：
                </Col>
                <Col xxs="16" s="10" l="7">
                  <IceFormBinder
                    name="oldPasswd"
                    required
                    message="必填"
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="请输入原始密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="oldPasswd" />
                </Col>
              </Row>

              <Row wrap style={styles.formItem}>
                <Col xxs="7" s="4" l="3" style={styles.formLabel}>
                  新密码：
                </Col>
                <Col xxs="16" s="10" l="7">
                  <IceFormBinder
                    name="passwd"
                    required
                    message="必填"
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="请输入新密码"
                    />
                  </IceFormBinder>
                  <IceFormError name="passwd" />
                </Col>
              </Row>

              <Row wrap style={styles.formItem}>
                <Col xxs="7" s="4" l="3" style={styles.formLabel}>
                  确认密码：
                </Col>
                <Col xxs="16" s="10" l="7">
                  <IceFormBinder
                    name="rePasswd"
                    required
                    message="必填"
                    validator={this.checkConfirmPassword}
                  >
                    <Input
                      htmlType="password"
                      size="large"
                      placeholder="两次输入密码保持一致"
                    />
                  </IceFormBinder>
                  <IceFormError name="rePasswd" />
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>

          <Row wrap style={{ marginTop: 20 }}>
            <Col xxs={{ offset: 6 }} s={{ offset: 3 }}>
              <Button
                size="large"
                type="primary"
                onClick={()=>this.handleSubmit(value, history)}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    value: state.resetSubUserPassword.value
  }
}

const mapDispatch = (dispatch) => {
  return {
    resetPwd(value, history) {
      dispatch(actionCreators.modifyPwd(value, history));
    },
    formChange(e) {
      dispatch(actionCreators.changeInputValue(e));
    },
    resetForm(){
      dispatch(actionCreators.resetPwdForm());
    },
  }
}

export default connect(mapState, mapDispatch)(ChangePasswordForm)

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
