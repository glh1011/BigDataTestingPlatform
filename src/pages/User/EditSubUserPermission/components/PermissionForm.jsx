import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Button,Checkbox, Icon } from '@icedesign/base';
// import { Checkbox } from '@alifd/next';
import { withRouter } from 'react-router';
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder/lib';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

const { Row, Col } = Grid;
const { Group: CheckboxGroup } = Checkbox;

@withRouter
class PermissionForm extends Component {

  validateAllFormField = () => {
    history.back();
  }

  render() {
    const { dataSource, value, onChange, handleSubmitForm } = this.props;
    console.log('选中的checkvalue'+value);
    let list=[]
    if(dataSource){
      list=dataSource;
      console.log(list);
    }else{
      list=[]
    }
    return (
      <div className="user-form">
        <IceContainer>
          <span style={styles.formTitle}>权限信息</span>
          <div style={styles.btnContainer}>
            <Button
              onClick={()=>this.props.selectAll(this.props.allChecked)}
              size="small"
              style={styles.batchBtn}
              
            >
              <Icon type="success"/>全选
            </Button>
            <Button
              onClick={()=>this.props.selectNone()}
              size="small"
              style={styles.batchBtn}
            >
              <Icon type="error"/>全不选
            </Button>
          </div>
        </IceContainer>
        
        <IceContainer>
          <IceFormBinderWrapper
            ref="form"
          >
            <div style={styles.formContent}>
              
              <div>
                <CheckboxGroup value={value} onChange={onChange}>
                {
                  (list||[]).map((item, index) => {
                    return (
                      <div key={index} style={styles.checkboxWrapper}>
                        <Checkbox value={item.permission.opName}>{item.permission.description}</Checkbox>
                      </div>
                    )
                  })
                } 
                </CheckboxGroup>
              </div>    
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                onClick={() => handleSubmitForm(value,localStorage.getItem('subUserId'),history)}
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
    this.props.getSubUserInfo(); 
  }

  componentWillUnmount() {
    this.props.checkboxReset();
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   value: nextProps.dataSource.list1,
    // });
  }
}

const mapStateToProps = (state) => {
  console.log(state.PermissionForm);
  
  return {
    value: state.PermissionForm.checkedArr,
    dataSource: state.PermissionForm.permissions,
    allChecked: state.PermissionForm.allCheckedArr
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSubUserInfo() {
    dispatch(actionCreators.getInfo());
  },
  handleSubmitForm(value,id,history) {
    console.log('mapdispatch' + value);
    dispatch(actionCreators.submitForm(value,id,history));
  },
  onChange(selectedItems) {
    console.log(selectedItems);
    dispatch(actionCreators.selectCheckbox(selectedItems));
  },
  checkboxReset() {
    dispatch(actionCreators.clearCheckbox());
  },
  selectAll(all) {
    dispatch(actionCreators.selectCheckbox(all));
  },
  selectNone() {
    dispatch(actionCreators.selectCheckbox([]));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PermissionForm);

const styles = {
  formTitle: {
    display: 'inline-block',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '24px',
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
  checkboxWrapper: {
    display: 'inline-block',
    borderBottom: '1px solid #fafafa',
    lineHeight: '45px',
    height: 45,
    width: '25%',
    paddingLeft: '20px',
    // paddingRight: '20px',
    textDecoration: 'none',
  }
};

