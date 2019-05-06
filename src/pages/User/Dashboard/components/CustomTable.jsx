import React, { Component } from 'react';
import { Table, Icon, Button, Pagination, Balloon } from '@icedesign/base';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';


@withRouter
class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      ballonVisible: false
    }
  }

  onRowClick = (record, index, e) => {
    localStorage.setItem('subUserId',record.userId);
    var id = record.id;
    this.props.history.push({ pathname: "/userManagement/subUserDetail", state: { id } });
  }

  onRowMouseEnter = (record, index, e) => {
    console.log("鼠标进入一行");
    this.setState({
      ballonVisible: true
    },function(){
      console.log(this.state.ballonVisible);
    })
  }

  onRowMouseLeave = (record, index, e) => {
    console.log("鼠标离开一行");
    this.setState({
      ballonVisible: false
    },function(){
      console.log(this.state.ballonVisible);
    })
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

  renderOper = (value, index, record) => {
    return (
      <div style={styles.oper}>
        <Link
        to={{pathname:`/userManagement/editSubUserInfo`}} 
        onClick={(e)=>{localStorage.setItem('subUserId',record.userId); e.stopPropagation();}} 
        style={{display:'inline-block',marginRight:'10px'}}
        >编辑</Link>
        <Link 
        to={{pathname:`/userManagement/editSubUserPermission`}} 
        onClick={(e)=>{localStorage.setItem('subUserId',record.userId); e.stopPropagation();}} 
        style={{display:'inline-block',marginRight:'10px'}}
        >权限</Link>
      </div>
    );
  };

  renderHint = (value) => {
    return (
      <Balloon
        align="lt"
        closable={false}
        style={{ lineHeight: '24px' }}
        trigger={<div style={{ margin: '5px' }}>{value}</div>}
      >
        单击一行查看详细信息
      </Balloon>
    );
  };

  componentDidMount() {
    this.props.getSubUsers();
  }

  renderAddBtn = () => {
    if(parseInt(localStorage.getItem('userLevel'))==0||parseInt(localStorage.getItem('userLevel'))==1) {
      return (
        <div style={styles.btnContainer}>
        <Link to="/userManagement/addSubUser">
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
          <span style={styles.formTitle}>下级用户</span>
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
              sortable
              align="center"
              cell={this.renderHint}
            />
            <Table.Column 
              width={100} title="登录名" 
              dataIndex="userName" 
              cell={this.renderHint} 
              sortable 
            />
            <Table.Column 
              width={100} 
              title="姓名" 
              dataIndex="name" 
              cell={this.renderHint} 
            />
            <Table.Column 
              width={100} 
              title="上级id" 
              dataIndex="superiorUserId" 
              cell={this.renderHint} 
            />
            <Table.Column 
              width={200} 
              title="邮箱" 
              dataIndex="email" 
              cell={this.renderHint} 
            />
            <Table.Column 
              width={100} 
              title="token" 
              dataIndex="token" 
              cell={this.renderHint} 
            />
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
    fontSize: '14px',
    height: '26px',
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
};
