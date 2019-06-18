import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog, Balloon} from '@icedesign/base';
import { connect } from 'react-redux';
import { actionCreators } from '../../store';
import { withRouter } from 'react-router';

import { Link } from 'react-router-dom';
// const getData = () => {
//   return Array.from({ length: 10 }).map((item, index) => {
//     return {
//       id: index + 1,
//       userLevel: this.props.resourceList.userLevel,
//       userName: this.props.resourceList.userName,
//       CPU: this.props.resourceList.CPU,
//       memory: this.props.resourceList.memory,
//       disk: this.props.resourceList.disk,
//     };
//   });
// };
@withRouter

class Home extends Component {
  static displayName = 'Home';
  handlePagination = (current) => {
    this.setState({
      current,
    });
  };
  
  //点击表格每一行出发的事件，record记录这一行绑定的数据
  onRowClick = (record, index, e) => {
    localStorage.setItem('selectUserName', record.username);
    console.log(this.props);
    this.props.history.push({
      pathname: '/Resource/FirstLevelResourceShow'
    })
  };

  renderHint = (value) => {
    return (
      <Balloon
        align="lt"
        closable={false}
        style={{ lineHeight: '24px' }}
        trigger={<div style={{ margin: '5px' }}>{value}</div>}
      >
        单击一行查看一级资源池信息
      </Balloon>
    );
  };

// //悬浮在表格每一行的时候触发,提醒用户点击
// onRowMouseEnter = (record, index, e) => {
//   return(
//     <Balloon
//       trigger={e.target}
//       align="tl"
//       alignment="edge"
//       triggerType="hover"
//       style={{ width: 300 }}
//     >
//       点击表格的一行，可查看一级资源池下的集群列表
//     </Balloon>
//   )
// }
  
  //回收资源池
  haddleRecycleResourcePool = (userName, current) => {
    var that = this;
    Dialog.confirm({
      content: "回收后数据将无法恢复，是否确认回收？",
      title: "警告",
      onOk: () => {
        console.log(userName);
        that.props.recycleResourcePool(userName, current);    
      }
    });
  };
  
  renderOperation = (value, index, record) => {
    const that = this;
    return (
      <div>
        <Button 
          type="primary"
          shape="warning"
          onClick={
            (e)=>{  
              that.haddleRecycleResourcePool(record.username, that.props.current);
              e.stopPropagation();
            }
          }
        >
          回收
        </Button>
      </div>
    )
  };
  
  render() {
    console.log(this.props);
    const { resourcePoolList } = this.props;
    console.log(resourcePoolList);
    return (
      <div style={styles.tableContainer}>
        <Table
          dataSource={Array.from(resourcePoolList)}
          onSort={this.handleSort}
          onRowClick={this.onRowClick}
          hasBorder={false}
          className="custom-table"
          style={styles.customTable}
        >
          <Table.Column width={100} title="资源池ID" dataIndex="resourcePoolId" cell={this.renderHint}/>
          <Table.Column width={100} title="用户登录名" dataIndex="username" cell={this.renderHint}/>
          <Table.Column width={100} title="CPU（个）" dataIndex="totalCpu"  cell={this.renderHint}/>
          <Table.Column width={100} title="内存（GB）" dataIndex="totalMem"  cell={this.renderHint}/>
          <Table.Column width={100} title="硬盘（GB）" dataIndex="totalDisk"  cell={this.renderHint}/>
          <Table.Column width={100} title="操作" cell={this.renderOperation} />
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
    resourcePoolList: state.Resource.resourcePoolList,
    current: state.Resource.resourcePoolListCurrent,
    total: state.Resource.resourcePoolListTotal
  }
}

const mapDispatch = (dispatch) => ({
  //分页
  onChange(current) {
    console.log("分页被点击");
    console.log(current);
    dispatch(actionCreators.getFirstLevelResourceList(current));
  },
  //回收资源池
  recycleResourcePool(userName, current) {
    console.log('mapDispatch  ' + userName);
    dispatch(actionCreators.recycleResourcePool(userName, current));
  }
})

export default connect(mapState, mapDispatch)(Home);

const styles = {
  tableContainer: {
    background: '#fff',
    paddingBottom: '10px',
  },
  customTable: {
    width: '90%',
    minWidth: '1000px',
    marginLeft: '4%',
    cursor:'pointer',
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
