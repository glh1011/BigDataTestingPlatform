import React, { Component } from 'react';
import { Table, Pagination, Balloon, Icon, Button, Select, Feedback} from '@icedesign/base';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { withRouter } from 'react-router';

@withRouter
class PlatformLog extends Component {
  static displayName = 'PlatformLog';
  componentDidMount() {
    this.props.getAllLog();
    if(parseInt(localStorage.getItem('userLevel'))===0) {
    this.props.getUrl();
  }
    else{
    this.props.getCluserName();
  }
  };
  onChange(){
     console.log(value);
  };

  handleChange = (value) => {
    this.setState({
			value:value,
		})
  };
  handleClick(e){
    if(this.state){
    this.props.jump(this.state.value);
    this.props.history.push('./CDHLog')}
    else{
      Feedback.toast.prompt("请选择集群");
    }
   }

  renderAddBtn = () => {
    if(parseInt(localStorage.getItem('userLevel'))===1||parseInt(localStorage.getItem('userLevel'))===2) {
      return (
      <div style={styles.btnContainer}>
        <Select size="small" placeholder='请选择集群名称' onChange={this.handleChange} dataSource={this.props.cluserName} ref={this.setCheckBoxRef} />&nbsp;&nbsp;
        <Button size="small" style={styles.batchBtn}
        onClick={(e)=>{this.handleClick(); e.stopPropagation();}} 
        ><Icon type="search" size="small" />查看CDH日志</Button>
      </div>
      )
    }
    if(parseInt(localStorage.getItem('userLevel'))===0) {
      return (
        <form style={styles.btnContainer}>
          <Button size="small" style={styles.batchBtn}>
            <Icon type="search" />
          <a href={this.props.url} style={{color:'black',textDecoration:'none'}} title="查看OpenStack日志" target="_blank">查看OpenStack日志</a>
          </Button>
       </form>
      )
    }
  }

  render() {
    const { dataSource } = this.props;
    return (
      <div>
        <div style={styles.IceContainer}>
          <a style={styles.formTitle}>平台日志</a>
          { this.renderAddBtn() }
        </div>
        <div style={styles.tableContainer}>
        <Table
          dataSource={dataSource}
          hasBorder={false}
          className="custom-table"
        >
          <Table.Column
            width={100}
            lock="left"
            title="操作编号"
            dataIndex="operationLogId"
            align="center"
          />
          <Table.Column width={100} title="操作人" dataIndex="operatorId" align="center" />
          <Table.Column width={200} title="操作" dataIndex="operation" align="center" />
          <Table.Column width={200} title="操作时间" dataIndex="operateTime" align="center" />
        </Table>
        <Pagination
          style={styles.pagination}
          onChange={this.props.onChange}
          total={this.props.total}
        />
      </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dataSource: state.PlatformLog.PlatformLog,
    current: state.PlatformLog.current,
    total: state.PlatformLog.total,
    cluserName: state.PlatformLog.cluserName,
    url: state.PlatformLog.url,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAllLog() {
    dispatch(actionCreators.getAllLogList(1));
  },
  getUrl() {
    dispatch(actionCreators.changeUrlLog());
  },
  getCluserName() {
    dispatch(actionCreators.getCluserName(localStorage.getItem('userName')));
  },
  //分页
  onChange(current) {
    dispatch(actionCreators.getAllLogList(current));
  },
  jump(value) {
    dispatch(actionCreators.getJumpList(value));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlatformLog);

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
    float: 'right',
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
