import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog } from '@icedesign/base';
import { connect } from 'react-redux';
import { actionCreators } from '../../store';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

@withRouter

class Home extends Component {
  static displayName = 'Home';

  handlePagination = (current) => {
    this.setState({
      current,
    });
  };

  onRowClick = (record, index, e) => {
    localStorage.setItem('onRowClickClusterName', record.clusterName);
    console.log(record.clusterName);
    this.props.history.push({
      pathname: '/Resource/ClusterResourceManage',
    })
  }

  bindUserCluster = (clusterName) => {
    localStorage.setItem('bindClusterName',clusterName);
    this.props.history.push({
      pathname:'/Resource/AssignClusterUser',
    })
  }
  
  unbindUserCluster = (clusterName) => {
    localStorage.setItem('unbindClusterName',clusterName);
    this.props.history.push({
      pathname: '/Resource/UnassignClusterUser',
    })
  }

  recycleCluster = (clusterName, userName, current) => {
    const that = this;
    Dialog.confirm({
      content: "回收后数据将无法恢复，是否确认回收？",
      title: "警告",
      onOk: () => {
        // localStorage.setItem('recycleClusterName',clusterName);
        that.props.recycleCluster(clusterName, userName, current);  
      }
    });
  }
  
  // renderOperation = (value, index, record) => {
  //   return(
  //     <Table.Column width={200} title="操作" cell={this.renderOperationButton} />
  //   )
  // }

  renderOperationButton = (value, index, record) => {
    const userLevel = localStorage.getItem('userLevel');
    if(userLevel==1) {
      const that = this;
      const userName = localStorage.getItem('userName');
      console.log(userName);
      return (
        <div>
          <Button 
            type="primary" 
            style={{background:'#2077FF'}} 
            onClick={
              (e)=>{ 
                that.bindUserCluster(record.clusterName);
                e.stopPropagation();
              }
            }
          >
            绑定
          </Button>
          <Button
            type="secondary"
            style={{background:'#FFC107'}}
            onClick={
              (e)=>{    
                that.unbindUserCluster(record.clusterName);
                e.stopPropagation();
              }
            }
          >
            解绑
          </Button>
          <Button 
            type="primary"
            shape="warning"
            onClick={
              (e)=>{    
                that.recycleCluster(record.clusterName, userName, that.props.current);
                e.stopPropagation();
              }
            }
          >
            回收
          </Button>
        </div>
      )
    }
  }

  render() {
    console.log(this.props);
    const { clusterList } = this.props;
    console.log(clusterList);
    return (
      <div style={styles.tableContainer}>
        <Table
          dataSource={Array.from(clusterList)}
          onSort={this.handleSort}
          onRowClick={this.onRowClick}
          hasBorder={false}
          className="custom-table"
          style={styles.customTable}
        >
          <Table.Column width={100} title="集群ID" dataIndex="clusterId" />
          <Table.Column width={100} title="集群名称" dataIndex="clusterName" />
          <Table.Column width={100} title="CPU（个）" dataIndex="totalCpu" />
          <Table.Column width={100} title="内存（GB）" dataIndex="totalMem" />
          <Table.Column width={100} title="硬盘（GB）" dataIndex="totalDisk" />
          <Table.Column width={200} title="创建时间" dataIndex="createTime" />
          <Table.Column width={200} title="操作" cell={this.renderOperationButton} />
        </Table>
        <Pagination
          style={styles.pagination}
          onChange={this.props.onChange}
          total={this.props.total}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    clusterList: state.Resource.clusterList,
    current: state.Resource.clusterListCurrent,
    total: state.Resource.clusterListTotal
  }
}

const mapDispatch = (dispatch) => ({
  //分页
  onChange(current) {
    console.log("分页被点击");
    console.log(current);
    dispatch(actionCreators.getResourceList(current));
  },
  // //跳转到Cloudera对应cluster页面
  // jumpToClouderaCluster(clusterName) {
  //   actionCreators.jumpToClouderaCluster(clusterName);
  // },
  //查看与集群相关联的二级用户
  getBoundSecondUser(clusterName) {
    actionCreators.getBoundSecondUser(clusterName);
  },
  //回收集群
  recycleCluster(clusterName, userName, current) {
    console.log('mapDispatch  ' + clusterName);
    console.log(userName);
    dispatch(actionCreators.recycleCluster(clusterName, userName, current));
  }
})

export default connect(mapState, mapDispatch)(Home);

const styles = {
  tableContainer: {
    background: '#fff',
    paddingBottom: '10px',
  },
  customTable: {
    width: '80%',
    minWidth: '1000px',
    marginLeft: '8%',
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
};
