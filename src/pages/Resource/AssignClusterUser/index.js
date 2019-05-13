/* eslint  react/no-string-refs: 0 */

import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Button, Grid, Checkbox, Feedback, Loading} from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { withRouter } from 'react-router';

const { Row, Col } = Grid;
const { Group: CheckboxGroup } = Checkbox;
@withRouter

class AssignClusterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
    this.onChange = this.onChange.bind(this);
  }
  handleSubmit = (value, clusterName ,history) => {
    this.formRef.validateAll((error) => {
      if (!error || error.length === 0) {
        this.props.handleSubmitForm(value, clusterName, history);
      }
    });
  }
  onChange(selectedItems) {
    this.setState({
      value: selectedItems,
    });
    console.log('onchange'+this.state.value);
  }
  render() {
    const that = this;
    const clusterName = localStorage.getItem('bindClusterName');
    const { handleSubmitForm, unboundSecondUser, history,} = this.props;
    const checkboxItem = [];
    if(unboundSecondUser){
      unboundSecondUser.map((item) => {
        checkboxItem.push(<Checkbox value={item} key={item}>{item}</Checkbox>)
      })
    }
    return (
      <div className="user-form" style={styles.rightSection}>
        <IceContainer>
            <IceFormBinderWrapper
              ref={(formRef) => {
                this.formRef = formRef;
              }}
            >
              <div style={styles.formContent}>
                <div style={styles.titleContainer}>
                  <h2 style={styles.formTitle}>绑定集群</h2>
                </div>
                <Row style={styles.formItem}>
                  <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                    集群名：
                  </Col>
                  <Col s="12" l="10">
                    <IceFormBinder name="cpu">
                    <Input
                        size="large"
                        value={clusterName}
                        style={{ width: '100%' }}
                        disabled
                      />
                    </IceFormBinder>
                  </Col>
                </Row>

                <Row style={styles.formItem}>
                  <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                    可绑定用户 ：
                  </Col>
                  <Col s="12" l="10" style={{marginTop:'5px'}}>
                    <IceFormBinder name="userName" requried>
                    <CheckboxGroup
                      value={this.state.value}
                      onChange={this.onChange}
                    >
                      {checkboxItem}
                    </CheckboxGroup>
                    </IceFormBinder>
                    <IceFormError name="userName" />
                  </Col>
                </Row>
              </div>
            </IceFormBinderWrapper>
          <Row style={{ marginTop: 50 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                onClick={()=>this.handleSubmit(that.state.value, clusterName, history)}
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
    const clusterName = localStorage.getItem('bindClusterName');
    this.props.getUnboundSecondUser(clusterName);
  }
}

const mapStateToProps = (state) => {
  return {
    unboundSecondUser: state.Resource.unboundSecondUser,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUnboundSecondUser(clusterName) {
    dispatch(actionCreators.getUnboundSecondUser(clusterName));
  },
  // handleInputChange(e) {
  //   dispatch(actionCreators.changeAllocateInputValue(e.userName, e.cpu, e.memory, e.disk));
  // },
  //提交表单
  handleSubmitForm(value, clusterName, history) {
    Feedback.toast.loading('加载中...');
    console.log("===============");
    console.log(value);
    if (value.length) {
      dispatch(actionCreators.submitAssignClusterUser(value, clusterName, history));
    }
    else{
      Feedback.toast.prompt('请选择用户');
    }
   
    //console.log(this.props.value);
    //e.persist();
    // dispatch(actionCreators.submitAllocateForm(value.userName, value.cpu, value.memory, value.disk, history));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignClusterUser);

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
  },
  // loadingContainer: {
  //   position: 'absolute',

  // },
  // loading: {
  //   width: '500px',
  //   textAlign: 'center',
  //   padding:'50px',
  //   marginBottom: '10px',
  // }
};
