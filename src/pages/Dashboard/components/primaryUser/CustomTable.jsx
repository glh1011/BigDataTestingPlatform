import React, { Component } from 'react';
import { Table, Icon, Button, Pagination } from '@icedesign/base';
// import { Pagination } from '@icedesign/base';
import axios from 'axios';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

@withRouter
class Home extends Component {
  static displayName = 'Home';

  onRowClick = (record, index, e) => {
    localStorage.setItem('subUserId',record.userId);
    //this.props.history.push('/SubUserDetail');
    var id = record.id;
    this.props.history.push({ pathname: "/SubUserDetail", state: { id } });
    //this.props.history.goBack();
  }

  handleSort = (dataIndex, order) => {
    const dataSource = this.state.dataSource.sort((a, b) => {
      const result = a[dataIndex] - b[dataIndex];
      if (order === 'asc') {
        return result > 0 ? 1 : -1;
      }
      return result > 0 ? -1 : 1;
    });

    this.setState({
      dataSource,
    });
  };

  renderState = (value) => {
    return (
      <div style={styles.state}>
        <span style={styles.circle} />
        <span style={styles.stateText}>{value}</span>
      </div>
    );
  };

  renderOper = (value, index, record) => {
    return (
      <div style={styles.oper}>
        <Link
        to={{pathname:`/EditSubUser`}} 
        onClick={(e)=>{localStorage.setItem('subUserId',record.userId); e.stopPropagation();}} 
        style={{display:'inline-block',marginRight:'10px'}}
        >编辑</Link>
        <Link 
        to={{pathname:`/EditSubUserPermission`}} 
        onClick={(e)=>{localStorage.setItem('subUserId',record.userId); e.stopPropagation();}} 
        style={{display:'inline-block',marginRight:'10px'}}
        >权限</Link>
      </div>
    );
  };

  componentDidMount() {
    this.props.getSubUsers();
  }

  renderAddBtn = () => {
    if(parseInt(localStorage.getItem('userLevel'))==0||parseInt(localStorage.getItem('userLevel'))==1) {
      return (
        <div style={styles.btnContainer}>
        <Link to="/addSubUser">
          <Button size="small" style={styles.batchBtn}>
            <Icon type="add" />增加人员
          </Button>
        </Link>
      </div>
      )
    }
  }

  render() {
    const { dataSource } = this.props;
    return (
      <div>
        <div style={styles.IceContainer}>
          <a style={styles.formTitle}>下级用户</a>
          { this.renderAddBtn() }
        </div>
        <div style={styles.tableContainer}>
        <Table
          dataSource={dataSource}
          onSort={this.handleSort}
          hasBorder={false}
          className="custom-table"
          onRowClick={this.onRowClick}
        >
          <Table.Column
            width={100}
            lock="left"
            title="序列号"
            dataIndex="userId"
            // cell={this.renderCatrgory}
            sortable
            align="center"
          />
          <Table.Column width={100} title="登录名" dataIndex="userName" sortable />
          <Table.Column width={100} title="姓名" dataIndex="name" />
          <Table.Column width={100} title="上级id" dataIndex="superiorUserId" />
          <Table.Column width={200} title="邮箱" dataIndex="email" />
          <Table.Column
            width={100}
            title="操作"
            cell={this.renderOper}
            lock="right"
            align="center"
          />
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
    dataSource: state.subUsers.subUsers,
    current: state.subUsers.current,
    total: state.subUsers.total
  }
}

const mapDispatchToProps = (dispatch) => ({
  getSubUsers() {
    var current = 1;
    dispatch(actionCreators.getSubUserList(current));
  },

  //分页
  onChange(current) {
    console.log("分页被点击");
    console.log(current);
    dispatch(actionCreators.getSubUserList(current));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

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
