import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import { Input, Button, Select, Grid, Feedback } from '@icedesign/base';
import { getPasswdAxios } from '../../../../api/webSSH';
import { findDetailByUserAndClusterAxios, findDetailByUserAxios } from '../../../../api/resource'

const { Row, Col } = Grid;

export default class ColumnForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        contractId: '',
        operator: '',
        settleAccount: '',
        period: '',
        currency: 'usd',
        clusterArr:[],
        hostnameArr:[],
        clusterValue:'',
        hostnameValue:'',
        display:'none',
        password:'',
        ipArr:{},
    };
  }

  
  render() {

    let clusterarr = [];
    this.state.clusterArr.map((item,index)=>(
        clusterarr[index]=item.clusterName
    ))

    let hostnamearr = [];
    this.state.hostnameArr.map((item,index)=>(
        hostnamearr[index]=item.hostName
    ))


    return (
      <div className="column-form">
        <IceContainer title="WebSSH" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
          >
            <div>
              <Row wrap>
                <Col xxs="24" s="10" l="10">
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      集群名：
                    </Col>
                    <Col s="12" l="12">
                      <IceFormBinder name="period">
                        <Select
                          className="next-form-text-align"
                          style={{ width: '100%' }}
                          dataSource={clusterarr}
                          value={this.state.clusterValue}
                          onChange={(value)=>this.onFormChange(value)}
                        >
                        </Select>
                      </IceFormBinder>
                      <IceFormError name="period" />
                    </Col>
                  </Row>
                </Col>

                <Col xxs="24" s="9" l="10">
                  <Row style={styles.formItem}>
                    <Col xxs="8" s="6" l="4" style={styles.formLabel}>
                      虚拟机：
                    </Col>
                    <Col s="12" l="12">
                      <IceFormBinder name="currency">
                        <Select
                          className="next-form-text-align"
                          style={{ width: '100%' }}
                          dataSource={hostnamearr}
                          value={this.state.hostnameValue}
                          onChange={(value)=>this.onhostnameChange(value)}
                        />
                      </IceFormBinder>
                    </Col>
                  </Row>
                </Col>

                <Col xxs="24" s="10" l="4">
                  <Button type="primary" onClick={this.submit}>
                    提交
                  </Button>
                </Col>
              </Row>
              <iframe id="wssh" style={{border:0,width:"100%",height:"360px",paddingBottom:"15px",display:this.state.display}} src="https://192.168.0.7:442/"/>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }

  onFormChange = (value) => {
    const that = this;
    var userName = localStorage.getItem('userName');
    that.setState({
        clusterValue:value
    },function(){ 
      findDetailByUserAndClusterAxios(userName, this.state.clusterValue)
        .then(function (res) {
          if(res) {
            let iparr = {};
            res.data.data[0].vms.map((item,index)=>(
                iparr[item.hostName]=item.ip
            ))
            that.setState({
              hostnameArr:res.data.data[0].vms,
              ipArr:iparr,
              hostnameValue:'',            
            })
          }
        })
    });
  };

  onhostnameChange = (value) => {
    const that = this;
    that.setState({
        hostnameValue:value
   });
  };


  submit = () => {
    const that = this;
    if(that.state.clusterValue != '' && that.state.hostnameValue != ''){
      getPasswdAxios(this.state.clusterValue, this.state.hostnameValue)
        .then(function (res) { 
          if(res){
            that.setState({
              password:res.data.data,
            },function(){
                let ipvalue = that.state.ipArr[that.state.hostnameValue];
                console.log(ipvalue);
                let iframe = document.querySelector('iframe#wssh');
                let message = JSON.stringify([ipvalue, '22', 'root', that.state.password]);
                iframe.contentWindow.postMessage(message, '*');
                console.log(message);
                var OnMessage = function(e){
                   console.log(e);
                };
                if(window.addEventListener){
                  window.addEventListener("message",OnMessage,false);
                }
            })
          }
        }) 
      that.setState({
        display:'block',
      })
    }else{
      Feedback.toast.prompt('请选择！');
    }
    

  };

  componentDidMount() {
    const that=this;  
    //获取集群名  
    var userName = localStorage.getItem('userName');
    findDetailByUserAxios(userName)
    .then(function (res) {
        if(res){
          that.setState({
            clusterArr:res.data.data
          })
        }
    })
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '30px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
