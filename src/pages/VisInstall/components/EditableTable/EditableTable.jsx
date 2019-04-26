import React, { Component } from "react";
import IceContainer from "@icedesign/container";
import { Table, Button, Input } from "@icedesign/base";
import { Dialog, Slider, Progress } from "@alifd/next";
import CellEditor from "./CellEditor";
import "./EditableTable.scss";
import { Notice } from "@icedesign/base";
import axios from "axios";
const slides = [
  {
    url: "https://img.alicdn.com/tps/TB1xuUcNVXXXXcRXXXXXXXXXXXX-1000-300.jpg",
    text: "Tape Player Skin Design Competition"
  },
  {
    url: "https://img.alicdn.com/tps/TB1xuUcNVXXXXcRXXXXXXXXXXXX-1000-300.jpg",
    text: "Mobile Phone Taobao Skin Call"
  },
  {
    url: "https://img.alicdn.com/tps/TB1ikP.NVXXXXaYXpXXXXXXXXXX-1000-300.jpg",
    text: "Design Enabling Public Welfare"
  },
  {
    url: "https://img.alicdn.com/tps/TB1s1_JNVXXXXbhaXXXXXXXXXXX-1000-300.jpg",
    text: "Amoy Doll Design Competition"
  }
];
const itemNodes = slides.map((item, index) => (
  <div key={index} className="slider-img-wrapper">
    <img src={item.url} alt={item.text} />
  </div>
));
export default class EditableTable extends Component {
  static displayName = "EditableTable";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      dataSource: this.props.generatorData,
      cpuUsed:
        parseInt(this.props.generatorData[0].cpu) *
          parseInt(this.props.generatorData[0].num) +
        parseInt(this.props.generatorData[1].cpu) *
          parseInt(this.props.generatorData[1].num),
      memUsed:
        parseInt(this.props.generatorData[0].mem) *
          parseInt(this.props.generatorData[0].num) +
        parseInt(this.props.generatorData[1].mem) *
          parseInt(this.props.generatorData[1].num),
      diskUsed:
        parseInt(this.props.generatorData[0].disk) *
          parseInt(this.props.generatorData[0].num) +
        parseInt(this.props.generatorData[1].disk) *
          parseInt(this.props.generatorData[1].num),
      unabled: false,
      whoOut: "",
      clusterName: "",
      visible: false,
      dialogContent: "正在创建集群，请耐心等候....",
      dialog: false,
      percent: 0,
      message: ""
    };
  }

  renderOrder = (value, index) => {
    return <span>{index}</span>;
  };

  deleteItem = index => {
    const dltUsed = this.state.dataSource[index];
    this.state.dataSource.splice(index, 1);
    let deleteAsync = () => {
      let da = new Promise(resolve => {
        this.setState({
          dataSource: this.state.dataSource,
          cpuUsed:
            this.state.cpuUsed - parseInt(dltUsed.num) * parseInt(dltUsed.cpu),
          memUsed:
            this.state.memUsed - parseInt(dltUsed.num) * parseInt(dltUsed.mem),
          diskUsed:
            this.state.cpuUsed - parseInt(dltUsed.num) * parseInt(dltUsed.disk)
        });
        resolve();
      });
      return da;
    };
    deleteAsync().then(() => {
      if (
        this.state.cpuUsed <= parseInt(this.props.cpu) &&
        this.state.memUsed <= parseInt(this.props.mem) &&
        this.state.diskUsed <= parseInt(this.props.disk)
      ) {
        this.setState({
          unabled: false,
          whoOut: ""
        });
      } else if (
        this.state.cpuUsed > parseInt(this.props.cpu) &&
        this.state.memUsed > parseInt(this.props.mem) &&
        this.state.diskUsed > parseInt(this.props.disk)
      ) {
        this.setState({
          unabled: true,
          whoOut: "cpu,mem,disk"
        });
      } else if (
        this.state.cpuUsed > parseInt(this.props.cpu) &&
        this.state.memUsed > parseInt(this.props.mem)
      ) {
        this.setState({
          unabled: true,
          whoOut: "cpu,mem"
        });
      } else if (
        this.state.cpuUsed > parseInt(this.props.cpu) &&
        this.state.diskUsed > parseInt(this.props.disk)
      ) {
        this.setState({
          unabled: true,
          whoOut: "cpu,disk"
        });
      } else if (
        this.state.memUsed > parseInt(this.props.mem) &&
        this.state.diskUsed > parseInt(this.props.disk)
      ) {
        this.setState({
          unabled: true,
          whoOut: "mem,disk"
        });
      } else if (this.state.cpuUsed > parseInt(this.props.cpu)) {
        this.setState({
          unabled: true,
          whoOut: "cpu"
        });
      } else if (this.state.memUsed > parseInt(this.props.mem)) {
        this.setState({
          unabled: true,
          whoOut: "mem"
        });
      } else if (this.state.diskUsed > parseInt(this.props.disk)) {
        this.setState({
          unabled: true,
          whoOut: "disk"
        });
      }
    });
  };

  renderOperation = (value, index) => {
    return (
      <div style={{ display: index > 1 ? "block" : "none" }}>
        <Button onClick={this.deleteItem.bind(this, index)} shape="text">
          删除
        </Button>
      </div>
    );
  };
  changeDataSource = (index, valueKey, value) => {
    this.state.dataSource[index][valueKey] = value;
    let runAsync = () => {
      let p = new Promise(resolve => {
        this.setState({
          dataSource: this.state.dataSource,
          cpuUsed: this.state.dataSource.reduce((pre, cur, index) => {
            if (index <= 1) {
              return (
                parseInt(cur.num) * parseInt(cur.cpu) +
                parseInt(pre.num) * parseInt(pre.cpu)
              );
            } else {
              return pre + parseInt(cur.num) * parseInt(cur.cpu);
            }
          }),
          memUsed: this.state.dataSource.reduce((pre, cur, index) => {
            if (index <= 1) {
              return (
                parseInt(cur.num) * parseInt(cur.mem) +
                parseInt(pre.num) * parseInt(pre.mem)
              );
            } else {
              return pre + parseInt(cur.mem) * parseInt(cur.num);
            }
          }),
          diskUsed: this.state.dataSource.reduce((pre, cur, index) => {
            if (index == 1) {
              return (
                parseInt(cur.disk) * parseInt(cur.num) +
                parseInt(pre.disk) * parseInt(pre.num)
              );
            } else {
              return pre + parseInt(cur.disk) * parseInt(cur.num);
            }
          })
        });
        resolve();
      });
      return p;
    };
    runAsync().then(() => {
      if (
        this.state.cpuUsed <= parseInt(this.props.cpu) &&
        this.state.memUsed <= parseInt(this.props.mem) &&
        this.state.diskUsed <= parseInt(this.props.disk)
      ) {
        this.setState({
          unabled: false,
          whoOut: ""
        });
      } else if (
        this.state.cpuUsed > parseInt(this.props.cpu) &&
        this.state.memUsed > parseInt(this.props.mem) &&
        this.state.diskUsed > parseInt(this.props.disk)
      ) {
        this.setState({
          unabled: true,
          whoOut: "cpu,mem,disk"
        });
      } else if (
        this.state.cpuUsed > parseInt(this.props.cpu) &&
        this.state.memUsed > parseInt(this.props.mem)
      ) {
        this.setState({
          unabled: true,
          whoOut: "cpu,mem"
        });
      } else if (
        this.state.cpuUsed > parseInt(this.props.cpu) &&
        this.state.diskUsed > parseInt(this.props.disk)
      ) {
        this.setState({
          unabled: true,
          whoOut: "cpu,disk"
        });
      } else if (
        this.state.memUsed > parseInt(this.props.mem) &&
        this.state.diskUsed > parseInt(this.props.disk)
      ) {
        this.setState({
          unabled: true,
          whoOut: "mem,disk"
        });
      } else if (this.state.cpuUsed > parseInt(this.props.cpu)) {
        this.setState({
          unabled: true,
          whoOut: "cpu"
        });
      } else if (this.state.memUsed > parseInt(this.props.mem)) {
        this.setState({
          unabled: true,
          whoOut: "mem"
        });
      } else if (this.state.diskUsed > parseInt(this.props.disk)) {
        this.setState({
          unabled: true,
          whoOut: "disk"
        });
      }
    });
  };

  renderEditor = (valueKey, value, index, record) => {
    return (
      <CellEditor
        valueKey={valueKey}
        index={index}
        value={record[valueKey]}
        onChange={this.changeDataSource}
      />
    );
  };

  addNewItem = () => {
    this.state.dataSource.push({
      cpu: "1",
      mem: "4",
      disk: "50",
      num: "1"
    });
    let addAsync = () => {
      let ad = new Promise(resolve => {
        this.setState({
          dataSource: this.state.dataSource,
          cpuUsed: this.state.cpuUsed + 1,
          memUsed: this.state.memUsed + 4,
          diskUsed: this.state.cpuUsed + 50
        });
        resolve();
      });
      return ad;
    };
    addAsync().then(() => {
      if (
        this.state.cpuUsed <= parseInt(this.props.cpu) &&
        this.state.memUsed <= parseInt(this.props.mem) &&
        this.state.diskUsed <= parseInt(this.props.disk)
      ) {
        this.setState({
          unabled: false,
          whoOut: ""
        });
      } else if (
        this.state.cpuUsed > parseInt(this.props.cpu) &&
        this.state.memUsed > parseInt(this.props.mem) &&
        this.state.diskUsed > parseInt(this.props.disk)
      ) {
        this.setState({
          unabled: true,
          whoOut: "cpu,mem,disk"
        });
      } else if (
        this.state.cpuUsed > parseInt(this.props.cpu) &&
        this.state.memUsed > parseInt(this.props.mem)
      ) {
        this.setState({
          unabled: true,
          whoOut: "cpu,mem"
        });
      } else if (
        this.state.cpuUsed > parseInt(this.props.cpu) &&
        this.state.diskUsed > parseInt(this.props.disk)
      ) {
        this.setState({
          unabled: true,
          whoOut: "cpu,disk"
        });
      } else if (
        this.state.memUsed > parseInt(this.props.mem) &&
        this.state.diskUsed > parseInt(this.props.disk)
      ) {
        this.setState({
          unabled: true,
          whoOut: "mem,disk"
        });
      } else if (this.state.cpuUsed > parseInt(this.props.cpu)) {
        this.setState({
          unabled: true,
          whoOut: "cpu"
        });
      } else if (this.state.memUsed > parseInt(this.props.mem)) {
        this.setState({
          unabled: true,
          whoOut: "mem"
        });
      } else if (this.state.diskUsed > parseInt(this.props.disk)) {
        this.setState({
          unabled: true,
          whoOut: "disk"
        });
      }
    });
  };
  createcluster = () => {
    this.setState({
      dialog: false,
      dialogContent: "正在创建集群，请耐心等候...."
    });
    axios
      .post("http://192.168.0.237:8080/cluster/install", {
        clusterName: this.state.clusterName,
        virtualMachineRequests: this.state.dataSource
      })
      .then(response => {
        const id = response.data.data;

        let intervalid = setInterval(() => {
          axios
            .get("http://192.168.0.237:8080/cluster/status", {
              params: { id: id }
            })
            .then(response => {
              if (response.data.data.status == "FAILED") {
                this.setState({
                  visible: true,
                  dialogContent: response.data.data.message,
                  dialog: true
                });
                clearInterval(intervalid);
              } else {
                this.setState({
                  visible: true
                });
                if (
                  response.data.data.percent == "100" &&
                  response.data.data.status == "REDIRECT"
                ) {
                  clearInterval(intervalid);
                  var form = document.createElement("form");
                  form.method = "post";

                  form.action = response.data.data.message.url;
                  var username = document.createElement("input");
                  username.type = "hidden";
                  username.name = "j_username";
                  username.value = response.data.data.message.param.j_username;
                  var password = document.createElement("input");
                  password.type = "hidden";
                  password.name = "j_password";
                  password.value = response.data.data.message.param.j_password;
                  form.appendChild(username);
                  form.appendChild(password);
                  document.getElementsByTagName("body")[0].append(form);
                  form.submit();
                } else {
                  this.setState((prevState, props) => ({
                    percent: response.data.data.percent,
                    message: response.data.data.message
                  }));
                }
              }
            })
            .catch(function(error) {});
        }, 1000);
      })
      .catch(error => {
        console.log(error);
      });
  };
  onChange = value => {
    this.setState({ clusterName: value });
  };
  onOpen = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div className="editable-table">
        <IceContainer>
          <h3 style={styles.formTitle}>
            集群名称:
            <Input
              value={this.state.clusterName}
              onChange={this.onChange.bind(this)}
              placeholder="请输入集群名称"
              style={{ marginLeft: "10px" }}
            />
            <span
              style={{
                display: this.state.clusterName.length == 0 ? "block" : "none",
                color: "red"
              }}
            >
              请输入集群名称
            </span>
          </h3>
          <h3 style={styles.formTitle}>虚拟机信息</h3>
          <Table dataSource={this.state.dataSource} hasBorder={false}>
            <Table.Column width={80} title="顺序" cell={this.renderOrder} />
            <Table.Column
              width={180}
              title="CPU"
              cell={this.renderEditor.bind(this, "cpu")}
            />
            <Table.Column
              width={180}
              title="内存"
              cell={this.renderEditor.bind(this, "mem")}
            />
            <Table.Column
              width={180}
              title="硬盘资源"
              cell={this.renderEditor.bind(this, "disk")}
            />
            <Table.Column
              width={180}
              title="虚拟机数量"
              cell={this.renderEditor.bind(this, "num")}
            />
            <Table.Column title="操作" width={80} cell={this.renderOperation} />
          </Table>
          <div
            style={{
              display: this.state.unabled ? "block" : "none",
              width: "30%",
              fontSize: "10em",
              color: "red"
            }}
          >
            <Notice style={{ backgroundColor: "red", color: "white" }}>
              {this.state.whoOut}超过给定限额,请修改
            </Notice>
          </div>
          <div style={styles.btn}>
            <button
              onClick={this.addNewItem}
              disabled={this.state.unabled}
              type="primary"
              style={
                this.state.unabled
                  ? {
                      ...styles.addNewItem,
                      background: "buttonface",
                      color: "graytext"
                    }
                  : styles.addNewItem
              }
            >
              + 新增一行
            </button>
            <button
              onClick={this.createcluster.bind(this)}
              disabled={
                this.state.unabled ||
                this.state.dataSource.length <= 2 ||
                this.state.clusterName.length == 0
              }
              style={
                this.state.unabled ||
                this.state.dataSource.length <= 2 ||
                this.state.clusterName.length == 0
                  ? {
                      ...styles.addNewItem,
                      background: "buttonface",
                      color: "graytext"
                    }
                  : styles.addNewItem
              }
            >
              创建集群
            </button>
            <Dialog
              style={{
                width: "70%",
                height: "63%"
              }}
              title="创建集群"
              visible={this.state.visible}
              onOk={this.onClose.bind(this, "okClick")}
              footerActions={this.state.dialog ? ["ok"] : []}
              align="cc cc"
            >
              <div style={{ display: this.state.dialog ? "block" : "none" }}>
                <img
                  src={require("./images/test1.jpg")}
                  style={{ width: "1000px", height: "300px" }}
                />
              </div>
              <span style={{ color: this.state.dialog ? "red" : "black" }}>
                {this.state.dialogContent}
              </span>
              <div style={{ display: this.state.dialog ? "none" : "block" }}>
                <Slider speed={1000} autoplay autoplaySpeed={2000}>
                  {itemNodes}
                </Slider>
              </div>
              <div
                style={{
                  display: this.state.dialog ? "none" : "block",
                  marginTop: "10px"
                }}
              >
                {this.state.message}...
              </div>
              <div
                style={{
                  display: this.state.dialog ? "none" : "block",
                  marginTop: "10px"
                }}
              >
                <div className="progress-outer">
                  <div className="progress-enter">
                    <div
                      className="progress-bg"
                      style={{ width: this.state.percent + "%" }}
                    />
                  </div>
                </div>
                <div className="percent">{this.state.percent}%</div>
              </div>
            </Dialog>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  formTitle: {
    margin: "0 0 20px",
    paddingBottom: "10px",
    fontSize: "14px",
    borderBottom: "1px solid #eee"
  },
  h4: {
    margin: "0 5px",
    background: "#4F74B3",
    color: "#fff",
    lineHeight: "150px",
    textAlign: "center",
    marginTop: 0,
    marginBottom: 0
  },
  addNewItem: {
    background: "#c7a47b",
    height: 32,
    lineHeight: "32px",
    marginTop: 20,
    cursor: "pointer",
    textAlign: "center",
    width: "20%",
    color: "#fff",
    borderRadius: "50px",
    marginRight: "30px",
    display: "inline-block", 
    border: "1px solid transparent",
    outline: "none"
  },
  btn: {
    width: "100%"
  }
};