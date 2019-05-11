import React, { Component } from 'react';
import { Table, Button, Icon, Pagination, Dialog } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { Link } from 'react-router-dom';
import axios from '../../../../utils/request';
import { Feedback } from '@icedesign/base';
import { withRouter } from 'react-router';

@withRouter
export default class SelectableTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [],
      dataSource: [],
      show: false,
      idWillDelete: '',
      total: 0,
      current: 1
    };

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
  }

  clearSelectedKeys = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };

  deleteSelectedKeys = () => {
    Feedback.toast.prompt("批量删除暂未开启");
  };

  deleteItem = (record) => {
    const { id } = record;
    this.setState({
      show: true,
      idWillDelete: id
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

  renderOperator = (value, index, record) => {
    return (
      <div>
        <Link to='/permissionManagement/editPermission'
        onClick={(e)=>{localStorage.setItem('permissionId',record.id); e.stopPropagation();}}
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

  //第一次渲染权限列表首页
  listRender(currentPage) {
    var url = '/api/permission/findAllPermisson?pageNum='+currentPage+'&pageSize=10'
    axios.get(url).then((res) => {
      if(res){
        const data = res.data.data.list;
        const total = res.data.data.total;
        //将权限数组中的permissionId修改为id
        data.forEach(function(item){
          item.id = item.permissionId;
          delete item.permissionId;
        })
        this.setState({
          dataSource: data,
          total: total
        });
      }
    })
  }

  //根据当前页面显示权限列表
  onChange = (current) => {
    var url = '/api/permission/findAllPermisson?pageNum='+current+'&pageSize=10';
    axios.get(url).then((res) => {
      if(res){
        const data = res.data.data.list;
        const total = res.data.data.total;
        //将权限数组中的permissionId修改为id
        data.forEach(function(item){
          item.id = item.permissionId;
          delete item.permissionId;
        })
        this.setState({
          dataSource: data,
          total: total,
          current: current
        });        
      } 
    }).catch(() => {
      console.log('error');
    })
  }

  //删除权限
  deleteSubmit = () => {
    var current = this.state.current;
    var that = this;
    var url = '/api/permission/deletePermissionById?id='+this.state.idWillDelete;
    axios.post(url)
      .then(function(response) {
        if(response){
          console.log(response);
          if(response.data.meta.success){
            Feedback.toast.success('删除权限成功');
            that.listRender(current);
          }else{
            Feedback.toast.error('删除权限失败');
          }
        }
      })
      .catch(function (error) {
        console.log("Oops!"+error);
      });
    }

  componentDidMount() {
    this.listRender(1);
  }

  // componentWillUnmount() {
  //   this.setState({
  //     dataSource: [],
  //   });
  // }

  render() {
    console.log(this.state);
    return (
      <div>
        <Dialog
          title="删除权限？"
          visible={this.state.show}
          onOk={()=>{
            this.deleteSubmit();
            this.setState({show:false}); 
            this.onClose.bind(this, 'okClick')
          }}
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
            <Table.Column title="编号" dataIndex="id" width={50} />
            <Table.Column title="名称" dataIndex="description" width={180} />
            <Table.Column title="url" dataIndex="opName" width={200} />
            <Table.Column title="级别" dataIndex="opLevel" width={50} />
            <Table.Column title="创建者" dataIndex="creator" width={100} />
            <Table.Column title="创建时间" dataIndex="createTime" width={180} />
            <Table.Column
              title="操作"
              cell={this.renderOperator}
              lock="right"
              width={50}
            />
          </Table>
          <div style={styles.pagination}>
            <Pagination 
            onChange={this.onChange} 
            total={this.state.total} 
            style={styles.pagination}
          />
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
};
