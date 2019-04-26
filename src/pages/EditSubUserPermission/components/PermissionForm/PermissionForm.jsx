/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid, Button, Checkbox } from '@icedesign/base';
// import { Checkbox } from '@icedesign/base';
import { withRouter } from 'react-router';
import {
  FormBinderWrapper as IceFormBinderWrapper,
} from '@icedesign/form-binder/lib';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/';


const { Row, Col } = Grid;
const { Group: CheckboxGroup } = Checkbox;
@withRouter
class PermissionForm extends Component {
  static displayName = 'PermissionForm';
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.dataSource ? this.props.dataSource.list1 : [],
    };
    this.onChange = this.onChange.bind(this);
  }
  handleSubmitForm1 = (value,id,history) => {
    this.props.handleSubmitForm(value,id,history)
  }
  onChange(selectedItems) {
    this.setState({
      value: selectedItems,
    });
  }
  validateAllFormField = () => {
    history.back();
  }
  render() {
    let list=[]
    if(this.props.dataSource){
      list=this.props.dataSource;
    }else{
      list=[]
    }
    return (
      <div className="user-form">
        <IceContainer>
          <IceFormBinderWrapper
            ref="form"
          >
            <div style={styles.formContent}>
              <h2 style={styles.formTitle}>权限信息</h2>
              <div>
                <CheckboxGroup itemDirection="ver" value={this.state.value} dataSource={list.list} onChange={this.onChange}/>
              </div>    
            </div>
          </IceFormBinderWrapper>

          <Row style={{ marginTop: 20 }}>
            <Col offset="3">
              <Button
                size="large"
                type="primary"
                // onClick={this.validateAllFormField}
                onClick={() => this.handleSubmitForm1(this.state.value,list.id,history)}
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
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.dataSource.list1,
    });
  }}
const mapStateToProps = (state) => {
  return {
     dataSource: state.PermissionForm.permissions,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSubUserInfo() {
    dispatch(actionCreators.getInfo());
  },
  handleSubmitForm(value,id,history) {
    console.log("===============");
    dispatch(actionCreators.submitForm(value,id,history))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PermissionForm);

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

