import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Grid, Select } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import './SettingsForm.scss';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { withRouter } from 'react-router';

const { Row, Col } = Grid;

@withRouter
class SettingsForm extends Component {

  render() {
    const { value, formChange, submitModify, history } = this.props;
    return (
      <div className="settings-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={value}
            onChange={formChange}
            ref={(formRef) => {
              this.formRef = formRef;
            }}
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>编辑权限</h2>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  名称：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="description" required message="必填" max={64}>
                    <Input size="large" placeholder="请输入权限名称" />
                  </IceFormBinder>
                  <IceFormError name="description" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  url：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="opName" required message="必填" max={64}>
                    <Input size="large" placeholder="请输入权限url" />
                  </IceFormBinder>
                  <IceFormError name="opName" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.label}>
                  类别：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="opLevel" required message="必填">
                    <Select
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="请选择..."
                      dataSource={[
                        { label: '系统管理员', value: '0' },
                        { label: '用户管理员', value: '1' },
                        { label: '普通用户', value: '2' },
                      ]}
                    />
                  </IceFormBinder>
                  <IceFormError name="opLevel" />
                </Col>
              </Row>

            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                style={{ width: 100 }}
                onClick={()=>this.handleSubmit()}
              >
                提 交
              </Button>
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }

  componentDidMount() {
    this.props.displayAuthorityInfo();
  }

  handleSubmit = () => {
    this.formRef.validateAll((error, value) => {
      console.log(value);
      if (!error || error.length === 0) {
        this.props.submitModify(value, this.props.history);
      }
    });
  }
}

const mapState = (state) => {
  return {
    value: state.editAuthority.value
  }
}


const mapDispatch = (dispatch) => {
  return {
    displayAuthorityInfo() {
      dispatch(actionCreators.getAuthorityDetail());
    },
    submitModify(value, history) {
      dispatch(actionCreators.modifyAuthority(value, history));
    },
    formChange(e) {
      dispatch(actionCreators.changeInput(e));
    },
  }
}

export default connect(mapState, mapDispatch)(SettingsForm)

const styles = {
  label: {
    textAlign: 'right',
  },
  formContent: {
    width: '100%',
    position: 'relative',
  },
  formItem: {
    alignItems: 'center',
    marginBottom: 25,
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
};
