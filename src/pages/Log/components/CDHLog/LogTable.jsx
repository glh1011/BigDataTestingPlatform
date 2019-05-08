import React, { Component } from 'react';
import { Table, Pagination, Balloon, Icon, Button, Select } from '@icedesign/base';
import axios from 'axios';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
// import { Select,Form } from '@alifd/next';
const {AutoComplete} = Select;

@withRouter
class CDHLog extends Component {
  static displayName = 'CDHLog';
  constructor(props) {
    super(props);
    this.subFormRef = element => {
      this.subForm = element;
    };
    this.iFrameRef = element => {
      this.iFrame = element;
    };
  }
  componentDidMount() {
    this.subForm.submit();
    var param= setInterval(() => {
     if(this.props.url){
       this.iFrame.src=this.props.url.split('/j')[0]+"/cmf/process/all/api/logs/search"
       window.clearInterval(param);
     }
   }, 100);
 }
  render() {
    return (
      <div>
        <div style={styles.IceContainer}>
          <a style={styles.formTitle}>CDH日志</a>
        </div>
      <form id="subForm" action={this.props.url} method="post" target="showZip" ref={this.subFormRef}> 
      <input type="hidden" name="j_username"  value={this.props.j_username} />
      <input type="hidden" name="j_password"  value={this.props.j_password} />
     </form>
  <iframe name="showZip" width = "100%" height="380px" sandbox='allow-scripts allow-same-origin' ref={this.iFrameRef}></iframe>
      </div>
      );}}
const mapStateToProps = (state) => {
  console.log("state")
  console.log(state)
  return {
    url: state.CDHLog.url,
    j_password: state.CDHLog.j_password,
    j_username: state.CDHLog.j_username,
  }
}
export default connect(mapStateToProps)(CDHLog)

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
  },
  IceContainer: {
    background: 'rgb(255, 255, 255)',
    borderRadius: '6px',
    padding: '20px',
    marginBottom: '20px',
    minHeight: 'auto',
    justifyContent: 'space-between',
  },
  tableContainer: {
    background: '#fff',
    paddingBottom: '10px',
  },
  pagination: {
    margin: '20px 0',
    textAlign: 'center',
  },
  editIcon: {
    color: '#999',
    cursor: 'pointer',
  },
  circle: {
    display: 'inline-block',
    background: '#28a745',
    width: '8px',
    height: '8px',
    borderRadius: '50px',
    marginRight: '4px',
  },
  stateText: {
    color: '#28a745',
  },

  //个人信息卡片
    content: {
      display: 'flex',
      flexDirection: 'column',
    },
    head: {
      display: 'flex',
      paddingBottom: '10px',
      borderBottom: '1px dotted #eee',
    },
    name: {
      padding: '0 10px',
      margin: 0,
    },
    deptName: {
      padding: '0 10px',
      margin: 0,
      fontSize: '12px',
    },
    body: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingTop: '10px',
    },
    profileItem: {
      width: '50%',
      lineHeight: '26px',
    },
    itemIcon: {
      color: '#8a9099',
      marginRight: '5px',
    }
};
