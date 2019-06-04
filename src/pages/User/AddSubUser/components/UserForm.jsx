/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Select } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder/lib';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { withRouter } from 'react-router';
import checkStrong from '../../../../utils/checkPwd'

const { Row, Col } = Grid;

@withRouter
class UserForm extends Component {

  subUserRank = () => {
    if(parseInt(localStorage.getItem('userLevel'))==0) {
      return (
        <Select
        style={{ width: '100%' }}
        size="large"
        placeholder="请选择..."
        dataSource={[
          { label: '一级用户', value: '1' },
        ]}
      ></Select>
      )
    }else{
      return (
      <Select
        style={{ width: '100%' }}
        size="large"
        placeholder="请选择..."
        dataSource={[
          { label: '二级用户', value: '2' },
        ]}
      ></Select>
      )
    }
  }

  componentWillUnmount(){
    this.props.resetForm();
  }

  handleSubmit = () => {
    this.formRef.validateAll((error, value) => {
      console.log(error);
      if (!error || error.length === 0) {
        this.props.submitSubUser(value, this.props.history);
      }
    });
  }

  checkPwdStrong = (rule, values, callback) => {
    if (!values) {
      callback('请输入新密码');
    } else if (values.length < 8) {
        callback('密码必须大于8位,且为字母数字组合');
    } else if (values.length >= 8 && values.length <= 16) {
      if(checkStrong(values) === 1) {
        callback('密码必须大于8位,且为字母数字组合');
        console.log('aaaaaaaaaaaaaa');
      }else{
        callback();
      }
    } else {
      callback('密码必须小于16位');
    }
  }

  render() {
    const { value, formChange, history, resetForm } = this.props;
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={value}
            onChange={formChange}
            ref={(formRef) => {
              this.formRef = formRef;
              }}
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>新增用户</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  登录名：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder 
                    name="userName" 
                    max={16} 
                    required 
                    message="必填且长度小于16"
                  >
                    <Input
                      size="large"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="userName" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  用户等级：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="userLevel" required message="必填">
                    {this.subUserRank()}
                  </IceFormBinder>
                  <IceFormError name="userLevel" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  姓名：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="name" max={32}>
                    <Input
                      size="large"
                      placeholder="请输入昵称"
                      style={{ width: '100%' }}
                    />
                  </IceFormBinder>
                  <IceFormError name="name" />
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
                      placeholder="请输入正确的邮箱"
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
                    max={64}
                    validator={this.checkPwdStrong}
                  >
                    <Input
                      style={{ width: '100%' }}
                      htmlType="password"
                      size="large"
                      placeholder="请输入初始密码"
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
                onClick={()=>this.handleSubmit()}
              >
                确认创建
              </Button>
            </Col>

            <Col>
              <Button
                size="large"
                type="primary"
                onClick={()=>{history.goBack();resetForm()}}
              >
                取消
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
    value: state.addSubUser.value
  }
}

const mapDispatch = (dispatch) => {
  return {
    submitSubUser(value, history) {
      dispatch(actionCreators.addSubUser(value, history));
    },
    formChange(e) {
      dispatch(actionCreators.changeFormValue(e));
    },
    resetForm() {
      dispatch(actionCreators.resetAddSubUser());
    }
  }
}

export default connect(mapState, mapDispatch)(UserForm)

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