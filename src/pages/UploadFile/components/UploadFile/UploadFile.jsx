/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Feedback, Button, Select, Upload, Dialog, Loading } from '@icedesign/base';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router';


@withRouter
class UploadFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      disabled: true,
      clusterName: [],
      vmwareData: {},
      visible: false,
      status: true
    };

    this.handleClusterChange = this.handleClusterChange.bind(this);
    this.handleVmChange = this.handleVmChange.bind(this);
    this.onChange = this.onChange.bind(this)
  }

  handleClusterChange(value) {
    const data = this.state.vmwareData[value];
    this.setState({ data, cluster: value, vm: '', disabled: !data });
  }

  handleVmChange(value) {
    this.setState({ vm: value });
    console.log(this.state.cluster, value);
  }

  saveUploaderRef = (ref) => {
    //   console.log(ref.getInstance())
    if(ref){
      this.uploaderRef = ref.getInstance();
    }
  };

  onSubmit = () => {
    //  console.log(this.uploaderRef)
    var url = `http://192.168.0.129:8080/file/uploadFile?hostName=${this.state.vm}&clusterName=${this.state.cluster}`
    var data = new FormData()
    if (this.uploaderRef.state.fileList[0]) {
      data.append("file", this.uploaderRef.state.fileList[0].originFileObj);
      this.setState({ visible: true })
      axios.post(url, data)
        .then((res) => {
          if (res.data.meta.success) {
            console.log(res)
            this.setState({ visible: false, status: true })
            Feedback.toast.success("文件上传成功");
          }

          else {
            console.log(res)
            this.setState({ visible: false })
            Feedback.toast.error("文件上传失败");
          }
        })
        .catch(e => {
          console.log("Oops, error", e)
          this.setState({ visible: false })
          Feedback.toast.error("文件上传失败");
        })
    }
    else {
      Dialog.alert({
        content: `上传文件不能为空！`,
        closable: true,
        title: 'Warning'
      });
    }


  }
  beforeUpload(info, options) {
    console.log('beforeUpload callback : ', info, options);
    return new Promise((resolve, reject) => {
      var size = JSON.stringify(info.size)
      size = size / 1024;//kb
      size = size / 1024;//mb
      console.log(parseFloat(size))
      if (parseFloat(size) <= 100) {
        resolve();
      } else {
        Dialog.alert({
          content: `File size is ${size.toFixed(2)}MB. Please don't exceed the limit 100MB！`,
          closable: true,
          title: 'Warning'
        });
        reject();
      }
    })
  }

  onChange(info) {
  //  console.log(info)
    if (info.file && info.file.status == 'removed') {
      this.setState({ status: true })
    }
    if (info.event && info.event.percent == 100) {
      this.setState({ status: false })
    }
  }

  componentWillMount() {
    var userName = localStorage.getItem('userName');
    var url = 'http://192.168.0.129:8080/userCluster/findDetailByUser?userName=' +userName;//换成userName
    axios.get(url)
      .then((res) => {
        if (res.data.meta.success) {
          console.log(res)
          var clusterData, clusterNameArr = [], vmwareObj = {}, vmwarehostNameArr = []

          clusterData = res.data.data
          for (var i = 0; i < clusterData.length; i++) {
            clusterNameArr.push(clusterData[i].clusterName)
          }

          for (var i = 0; i < clusterData.length; i++) {
            vmwarehostNameArr[i] = []
            for (var j = 0; j < clusterData[i].vms.length; j++) {
              console.log(clusterData[i].vms[j].hostName)
              vmwarehostNameArr[i].push(clusterData[i].vms[j].hostName)
            }
            var str = clusterNameArr[i]
            vmwareObj[str] = vmwarehostNameArr[i]
          }
          console.log(clusterNameArr, vmwareObj)
          this.setState({ clusterName: clusterNameArr, vmwareData: vmwareObj })
        }
        else {
          Feedback.toast.error("获取集群失败")
          console.log("获取集群失败")
        }
      })
      .catch(e => {
        console.log("Oops, error", e)
        Feedback.toast.error("获取集群失败")
      })
  }


  render() {
    const { data, disabled, cluster, clusterName, vm, status } = this.state;

    return (
      <div>
        <div style={styles.IceContainer}>
          <a style={styles.formTitle}>上传文件</a>
        </div>
        <div style={styles.tableContainer}>
          <div style={styles.demo_container}>
            <div>
              <Select style={styles.next_select} size="large" placeholder="集群名称" dataSource={clusterName} value={cluster} onChange={this.handleClusterChange} />
              &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            <Select style={styles.next_select} size="large" placeholder="虚拟机" dataSource={data} value={vm} onChange={this.handleVmChange} disabled={disabled} />
            </div>
          </div>
          <br />
          <div style={{ margin: "10px 70px" }}>
            <Loading visible={this.state.visible} shape="fusion-reactor" tip=" 正在上传，请耐心等待...">


              <Upload
                timeout={60000}//一分钟
                limit={1}
                // action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
                autoUpload={false}
                ref={this.saveUploaderRef}
                listType="text"
                beforeUpload={this.beforeUpload}
                onChange={this.onChange}
              >
                <Button size="large" type="normal" style={{ margin: '0 0 10px', width: "200px" }}>Upload</Button>
              </Upload>
              <br /><br />
              <Button style={{ margin_right: "30%", margin_top: "60px" }} type="secondary" size="large" onClick={this.onSubmit} disabled={status}>Submit</Button>
              {/* {this.fileStatus(status)} */}
            </Loading>
          </div>
        </div>

      </div>
    );
  }
}



export default UploadFile;

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
    paddingBottom: '100px',
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
  },
  demo_container: {
    // background_color: "#8a9099",
    padding: "16px",
    margin: "auto 50px",
  },
  next_select: {
    background_color: "#eee",
    width: "30%",
    margin_right: "10px",
  }
};

