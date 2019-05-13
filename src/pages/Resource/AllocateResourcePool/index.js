import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Grid, Select, Feedback} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { withRouter } from 'react-router';

const { Row, Col } = Grid;

@withRouter

class AllocateResourcePool extends Component {
  static displayName = 'SettingsForm';

  handleSubmit = () => {
    this.formRef.validateAll((error, value) => {
      console.log(value);
      if (!error || error.length === 0) {
        if(value.cpu.length<=10&&value.disk.length<=10&&value.memory.length<=10){
          this.props.handleSubmitForm(value, this.props.history); 
        }
        else {
          Feedback.toast.error("CPU、内存、硬盘数量位数不能超过10！");
        }
      }
    });
  }
  // inputNumberValidator = (rule, value, callback) => {
  //   console.log(value);
  //   let reg = /^[0-9]*$/;
  //   console.log(!reg.test(value));
  //   if(!reg.test(value)){
  //     callback('只能输入数字！')
  //   }
  //   else{
  //     callback();
  //   }
  // }

  render() {
    const { value, firstLevelUser, history, handleInputChange } = this.props;
    const SelectItem = [];
    firstLevelUser.map((item) => {
      SelectItem.push(<Select.Option value={item} key={item}>{item}</Select.Option>);
    })
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            value={value}
            onChange={handleInputChange}
            ref={(formRef) => {
              this.formRef = formRef;
            }}
          >
            <div style={styles.formContent}>
              <div style={styles.titleContainer}>
                <h2 style={styles.formTitle}>分配一级资源池</h2>
              </div>
              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  一级用户：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="userName" required message="请选择用户名">
                    <Select
                        style={{ width: '100%' }}
                        size="large"
                    >
                    {SelectItem}
                    </Select>
                  </IceFormBinder>
                  <IceFormError name="userName" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  CPU（个）：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="cpu" required message="必填且不能超过十位">
                    <Input
                        size="large"
                        placeholder="请输入CPU数量"
                        style={{ width: '100%' }}
                        htmlType="number"
                        maxLength={10}
                        hasLimitHint
                      />
                  </IceFormBinder>
                  <IceFormError name="cpu" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  内存（GB）：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="memory" required message="必填且不能超过十位">
                    <Input
                        size="large"
                        placeholder="请输入内存数量"
                        style={{ width: '100%' }}
                        htmlType="number"
                        maxLength={10}
                        hasLimitHint
                      />
                  </IceFormBinder>
                  <IceFormError name="memory" />
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                  硬盘（GB）：
                </Col>
                <Col s="12" l="10">
                  <IceFormBinder name="disk" required message="必填且不能超过十位">
                    <Input
                      size="large"
                      placeholder="请输入硬盘数量"
                      style={{ width: '100%' }}
                      htmlType="number"
                      maxLength={10}
                      hasLimitHint
                    />
                  </IceFormBinder>
                  <IceFormError name="disk" />
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
                onClick={()=>this.handleSubmit()}
              >
                提交
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
    this.props.getFirstLevelUserWithoutResource();
  }
}

const mapStateToProps = (state) => {
  return {
    value: state.Resource.allocateInputValue,
    firstLevelUser: state.Resource.firstLevelUser,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getFirstLevelUserWithoutResource() {
    dispatch(actionCreators.getFirstLevelUserWithoutResource());
  },
  handleInputChange(e) {

    dispatch(actionCreators.changeAllocateInputValue(e.userName, e.cpu, e.memory, e.disk));
  },
  //提交表单
  handleSubmitForm(value, history) {
    console.log("===============");
    console.log(value);
    //console.log(this.props.value);
    //e.persist();
    dispatch(actionCreators.submitAllocateForm(value.userName, value.cpu, value.memory, value.disk, history));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllocateResourcePool);

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
    marginTop: '20px',
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
    margin: 0,
    paddingBottom: '10px',
    display: 'inline-block',
  },
  titleContainer: {
    borderBottom: '1px solid #eee',
    margin: '0 0 20px',
  }
};
