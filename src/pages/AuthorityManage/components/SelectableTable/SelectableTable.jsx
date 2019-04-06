import React, { Component } from 'react';
import { Table, Button, Icon, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const getMockData = () => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push({
      id: 100306660940 + i,
      // name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`,
      name: '查看下级人员列表',
      description: '所有用户都具有的权限所有用户都具有的权限',
      type: '所有用户拥有',
      time: 2000 + i,
    });
  }
  return result;
};

class SelectableTable extends Component {
  static displayName = 'SelectableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 表格可以勾选配置项
    this.rowSelection = {
      // 表格发生勾选状态变化时触发
      onChange: (ids) => {
        console.log('ids', ids);
        this.setState({
          selectedRowKeys: ids,
        });
      },
      // 全选表格时触发的回调
      onSelectAll: (selected, records) => {
        console.log('onSelectAll', selected, records);
      },
      
      // // 支持针对特殊行进行定制，使某一行禁用
      // getProps: (record) => {
      //   return {
      //     disabled: record.id === 100306660941,
      //   };
      // },

    };

    this.state = {
      selectedRowKeys: [],
      dataSource: getMockData(),
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
        <a>编辑</a>
        <a
          style={styles.removeBtn}
          onClick={this.deleteItem.bind(this, record)}
        >
          删除
        </a>
      </div>
    );
  };

  render() {
    return (
      <div className="selectable-table" style={styles.selectableTable}>
        <IceContainer style={styles.IceContainer}>
          <a style={styles.formTitle}>个人权限</a>
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
              selectedRowKeys: this.state.selectedRowKeys,
            }}
          >
            <Table.Column title="编号" dataIndex="id" width={120} />
            <Table.Column title="名称" dataIndex="name" width={160} />
            <Table.Column title="描述" dataIndex="description" width={350} />
            <Table.Column title="类型" dataIndex="type" width={160} />
            <Table.Column title="创建时间" dataIndex="time" width={120} />
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

// const mapStateToProps = (state) => {
//   return {
//     //有两级
//     dataSource: state.authorities.authorities,
//     selectedRowKeys: state.authorities.selectedRowKeys
//   }
// }

// //store.dispatch
// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }

//export default connect(mapStateToProps, null)(SelectableTable);
export default SelectableTable;

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
