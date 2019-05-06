/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Button, Icon } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder/lib';
import { connect } from 'react-redux';
import { actionCreators } from '../store/';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const { Row, Col } = Grid;
@withRouter
class UserForm extends Component {

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
              <div style={styles.titleContainer}>
                <h2 style={styles.formTitle}>个人信息</h2>
                <div style={styles.btnContainer}>
                  <Link to="/userManagement/changeSubUserPwd">
                    <Button size="small" style={styles.batchBtn}>
                      <Icon type="add" />修改人员密码
                    </Button>
                    </Link>
                </div>
              </div>

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
                      message="长度小于32" max={32}
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
                onClick={()=>{history.goBack();}}
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
    this.props.getSubUserInfo();
  }
}

const mapStateToProps = (state) => {
  return {
    value: state.editSubUser.value.data
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSubUserInfo() {
    dispatch(actionCreators.getInfo());
  },
  handleInputChange(e) {
    dispatch(actionCreators.changeInputValue(e.name, e.email));
  },
  //提交表单
  handleSubmitForm(value, history) {
    dispatch(actionCreators.submitForm(value.name, value.email, history));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);

const styles = {
  formContent: {
    width: '100%',
    position: 'relative',
  },
  btnContainer: {
    float: 'right',
  },
  batchBtn: {
    marginRight: '10px',
    fontSize: '14px',
    height: '26px',
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
    marginTop: '0',
    display: 'inline-block',
  },
  titleContainer: {
    borderBottom: '1px solid #eee',
    margin: '0 0 20px',
  }
};

