import React, { Component } from 'react';
import { Table, Button, Icon, Pagination, Dialog } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Feedback } from '@icedesign/base';
import { withRouter } from 'react-router';

@withRouter
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
      dataSource: [],
      show: false,
      idWillDelete: '',
      total: 0,
      current: 1
    };
   }

  clearSelectedKeys = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };

  deleteSelectedKeys = () => {
    const { selectedRowKeys } = this.state;
  };

  deleteItem = (record) => {
    const { permissionId } = record;
  
    this.setState({
      show: true,
      idWillDelete: permissionId
    })
  };

  //弹窗的相关方法
  onOpen = () => {
    this.setState({
        show: true
    });
  };

onClose = reason => {
    console.log(reason);
    this.setState({
      show: false
    });
};

deleteSubmit = () => {
  var current = this.state.current;
  var that = this;
  var url = 'http://192.168.0.129:8080/permission/deletePermissionById?id='+this.state.idWillDelete;
  axios
    .post(url)
    .then(function(response) {
      console.log(response);
      if(response.data.meta.success){
        Feedback.toast.success('删除权限成功');
        that.listRender(current);
      }else{
        Feedback.toast.error('删除权限失败');
      }
    })
    .catch(function (error) {
      alert("Oops!"+error);
    });
  }

onChange = (current) => {
  var url = 'http://192.168.0.129:8080/permission/findAllPermisson?pageNum='+current+'&pageSize=10';
  axios.get(url).then((res) => {
      const data = res.data.data.list;
      const total = res.data.data.total;
      this.setState({
        dataSource: data,
        total: total,
        current: current
      });
    }).catch(() => {
      console.log('error');
    })
  }

  renderOperator = (value, index, record) => {
    return (
      <div>
        <Link to='/permissionManagement/editPermission'
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

  listRender(currentPage) {
    var url = 'http://192.168.0.129:8080/permission/findAllPermisson?pageNum='+currentPage+'&pageSize=10'
    axios.get(url).then((res) => {
      const data = res.data.data.list;
      const total = res.data.data.total;
      this.setState({
        dataSource: data,
        total: total
      });
    }).catch(() => {
      console.log('error');
    })
  }

  componentDidMount() {
    this.listRender(1);
  }

  render() {
    return (
      <div>
        <Dialog
          title="删除权限？"
          visible={this.state.show}
          onOk={()=>{this.deleteSubmit();this.setState({show:false}); this.onClose.bind(this, 'okClick')}}
          onCancel={this.onClose.bind(this, 'cancelClick')}
          onClose={this.onClose}>
          Are you sure to delete this permission?
      </Dialog>
      <div className="selectable-table" style={styles.selectableTable}>
        <IceContainer style={styles.IceContainer}>
          <a style={styles.formTitle}>系统权限</a>
          <div style={styles.btnContainer}>
            <Link to="/permissionManagement/addPermission">
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
            <Pagination onChange={this.onChange} total={this.state.total} style={styles.pagination}/>
          </div>
        </IceContainer>
      </div>
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
    fontSize: '14px',
    height: '26px',
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
    textAlign: 'center',
    paddingTop: '26px',
  },
  dialog: {
    width:'400px', 
    height:'250px',
    background: '#fff',
    border: '1px #bfbfbf solid',
    borderRadius: '10px',
    position:'absolute',
    top:'50%',
    left:'50%',
    marginLeft:'-200px',
    marginTop:'-125px',
    zIndex:'10'
  },
  dialogText: {
    padding: '30px',
  }
};
