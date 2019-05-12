import React, { Component } from 'react';
import { Table, Icon, Button,} from '@icedesign/base';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Feedback } from '@icedesign/base';
import { findDetailByUserAxios,
  findDetailByUserAndClusterAxios,
  toClouderaClusterAxios,
} from '../../../../api/resource';

@withRouter
class VmTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: {},
    };
  }

  listRender = () => {
    if (parseInt(localStorage.getItem('userLevel')) == 2){
      const userName = localStorage.getItem('userName');
      findDetailByUserAxios(userName).then(
        (res) => {
          if(res){   
            if(res.data.meta.success){
              const list = res.data;
              this.setState({
                dataSource: list,
              });
            }else{
              console.log("Oops"+res.data.meta.message);
            }
          }
        }
      )
    }
    if(parseInt(localStorage.getItem('userLevel')) == 1 || parseInt(localStorage.getItem('userLevel')) == 0) {
      const userName = localStorage.getItem('userName');
      const clusterName = localStorage.getItem('onRowClickClusterName');
      findDetailByUserAndClusterAxios(userName, clusterName).then(
        (res) => {
          if(res){   
            if(res.data.meta.success){
              const list = res.data;
              this.setState({
                dataSource: list,
              });
            }else{
              console.log("Oops"+res.data.meta.message);
            }
          }
        }
      )
    }
  }

  jumpToCDH = (clusterName) => {
    Feedback.toast.loading('加载中...');
    toClouderaClusterAxios(clusterName).then(
      (res) => {
        if(res){
          console.log(res);
          const info = res.data.data;
          if(res.data.meta.success){
            let newWindow = window.open("about:blank");
    
            var form = document.createElement("form");
            form.method = "post";
            form.action = info.url;
            var username = document.createElement("input");
            username.type = "hidden";
            username.name = "j_username";
            username.value = info.param.j_username;
            var password = document.createElement("input");
            password.type = "hidden";
            password.name = "j_password";
            password.value = info.param.j_password;
            form.appendChild(username);
            form.appendChild(password);
    
            newWindow.document.getElementsByTagName("body")[0].append(form);
            form.submit();
          }
        }        
      }
    )
  }

  componentDidMount() {
    this.listRender();
  }

  render() {
    return (
      <div>
        <div style={styles.IceContainer}>
          <span style={styles.formTitle}>虚拟机资源信息查看</span>
        </div>
        <div style={styles.IceContainer}>    
          {
            (this.state.dataSource.data||[]).map((item, index) => {
              return (
                <div key={index}>
                <div>
                <h3 key={item.clusterName} style={{display:"inline-block"}}>{item.clusterName}</h3>
                <Button style={{float:"right"}} onClick={()=>this.jumpToCDH(item.clusterName)}>跳转至CDH</Button>
                </div>
                <Table key={item.vms} dataSource={item.vms}>
                  <Table.Column width={50} title="cpu(个)" dataIndex="cpu" />
                  <Table.Column width={50} title="内存(GB)" dataIndex="mem" />
                  <Table.Column width={50} title="硬盘(GB)" dataIndex="disk" />
                  <Table.Column width={100} title="主机名" dataIndex="hostName" />
                  <Table.Column width={100} title="ip" dataIndex="ip" />
                </Table>
                </div>
              )
            })
          } 
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(VmTable)

const styles = {
  formTitle: {
    display: 'inline-block',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '24px',
  },
  IceContainer: {
    background: 'rgb(255, 255, 255)',
    borderRadius: '6px',
    padding: '20px',
    marginBottom: '20px',
    minHeight: 'auto',
    justifyContent: 'space-between',
  },
};
