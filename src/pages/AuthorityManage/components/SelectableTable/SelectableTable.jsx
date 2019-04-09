import React, { Component } from 'react';
import { Table, Button, Icon, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { isDeepStrictEqual } from 'util';

export default class SelectableTable extends Component {

  static displayName = 'SelectableTable';

  constructor(props) {
    super(props);
    // 表格可以勾选配置项
    this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: (ids, records) => {
        console.log(records);
        console.log('ids', ids);
        this.setState({
          selectedRowKeys: ids
        });
      },
      onSelect: (selected, record, records) => {
        console.log('onSelect', selected, record, records);
      },
      // 全选表格时触发的回调
      onSelectAll: (selected, records) => {
        console.log('onSelectAll', selected, records);
      },
    };

    this.state = {
      selectedRowKeys: [],
      // dataSource: getMockData(),
      dataSource: [],
    };
   }

  clearSelectedKeys = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };

  deleteSelectedKeys = () => {
    const { selectedRowKeys } = this.state;
    console.log('delete keys', selectedRowKeys);
  };

  deleteItem = (record) => {
    const { id } = record;
    console.log('delete item', id);
  };

  renderOperator = (value, index, record) => {
    return (
      <div>
        <Link to='/Authority/EditAuthority'
        onClick={(e)=>{localStorage.setItem('permissionId',record.permissionId); e.stopPropagation();}}
        >
          编辑
        </Link>
        <a
          style={styles.removeBtn}
          onClick={this.deleteItem.bind(this, record)}
        >
          删除
        </a>
      </div>
    );
  };

  componentDidMount() {
    axios.get('http://192.168.0.216:8080/permission/findAllPermisson?pageNum=1&pageSize=10').then((res) => {
    //axios.get('/mock/authorities.json').then((res) => {
      // const data = res.data.data.authorities;
      const data = res.data.data;
      console.log(res);
      this.setState({
        dataSource: data,
      });
    }).catch(() => {
      console.log('error');
    })
  }

  render() {
    return (
      <div className="selectable-table" style={styles.selectableTable}>
        <IceContainer style={styles.IceContainer}>
          <a style={styles.formTitle}>系统权限</a>
          <div style={styles.btnContainer}>
            <Link to="/Authority/AddAuthority">
              <Button size="small" style={styles.batchBtn}>
                <Icon type="add" />增加
              </Button>
            </Link>
            <Button
              onClick={this.deleteSelectedKeys}
              size="small"
              style={styles.batchBtn}
              disabled={!this.state.selectedRowKeys.length}
            >
              <Icon type="ashbin" />删除
            </Button>
            <Button
              onClick={this.clearSelectedKeys}
              size="small"
              style={styles.batchBtn}
            >
              <Icon type="close" />清空选中
            </Button>
          </div>
        </IceContainer>
        <IceContainer>
          <Table
            dataSource={this.state.dataSource}
            isLoading={this.state.isLoading}
            rowSelection={{
              ...this.rowSelection,
               selectedRowKeys: this.state.selectedRowKeys
            }}
          >
            {/* <Table.Column title="编号" dataIndex="id" width={120} />
            <Table.Column title="名称" dataIndex="name" width={160} />
            <Table.Column title="描述" dataIndex="description" width={350} />
            <Table.Column title="类型" dataIndex="type" width={160} />
            <Table.Column title="创建时间" dataIndex="time" width={120} /> */}
            <Table.Column title="编号" dataIndex="permissionId" width={50} />
            <Table.Column title="名称" dataIndex="opName" width={230} />
            <Table.Column title="级别" dataIndex="opLevel" width={50} />
            <Table.Column title="创建者" dataIndex="creator" width={100} />
            <Table.Column title="创建时间" dataIndex="createTime" width={280} />
            <Table.Column
              title="操作"
              cell={this.renderOperator}
              lock="right"
              width={120}
            />
          </Table>
          <div style={styles.pagination}>
            <Pagination onChange={this.change} />
          </div>
        </IceContainer>
      </div>
    );
  }

}

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
    marginBottom: '20px',
    minHeight: 'auto',
    //display: 'flex',
    justifyContent: 'space-between',
  },
  removeBtn: {
    marginLeft: 10,
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
