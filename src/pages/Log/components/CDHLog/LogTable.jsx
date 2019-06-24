import React, { Component } from 'react';
import { Table, Pagination, Balloon, Icon, Button, Select } from '@icedesign/base';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import { Select,Form } from '@alifd/next';
const {AutoComplete} = Select;

@withRouter
class CDHLog extends Component {
  static displayName = 'CDHLog';
  constructor(props) {
    super(props);
    this.subFormRef = element => {
      console.log(element)
      this.subForm = element;
    };
    this.iFrameRef = element => {
      this.iFrame = element;
    };
  }

  displayLogIframe() {
    console.log("url之前");
    var param= setInterval(() => {
      if(this.props.url || localStorage.getItem('CDHLoginUrl')){
        console.log("this.props.url"+this.props.url);
        console.log("localStorage"+localStorage.getItem('CDHLoginUrl'));
        if(this.props.url){
          console.log("if");
          //this.iFrame.src = this.props.url.split('/j')[0]+"/cmf/process/all/logs/search";
          this.iFrame.src = "https:"+this.props.url.split(':')[1]+":447/cmf/process/all/logs/search";
          console.log("获取到url"+this.iFrame.src);
        } else {
          console.log("else");
          //this.iFrame.src = localStorage.getItem('CDHLoginUrl').split('/j')[0]+"/cmf/process/all/logs/search";
          this.iFrame.src = "https:"+localStorage.getItem('CDHLoginUrl').split(':')[1]+":447/cmf/process/all/logs/search";
          console.log("存储url"+this.iFrame.src);
        }
        window.clearInterval(param);
      }
    }, 1000);
    console.log("addEventListener之外");
    window.addEventListener('message', (e) => {
      console.log(e);
      console.log("postmessage---"+"https:"+this.props.url.split(':')[1]+":447");
      if (e.data === 'loaded') {
       this.iFrame.contentWindow.postMessage(JSON.stringify({
         username: this.props.j_username,
         password: this.props.j_password
       }), "https:"+this.props.url.split(':')[1]+":447");
      }
    });
    console.log("window");
    console.log(window);
    
  }

  componentDidMount() {
    this.displayLogIframe();
 }
 
  render() {
    return (
      <div>
        <div style={styles.IceContainer}>
          <a style={styles.formTitle}>CDH日志</a>
        </div>
        <form id="subForm" action={"https:"+this.props.url.split(':')[1]+":447"} method="post" target="showZip" ref={this.subFormRef}> 
          <input type="hidden" name="j_username"  value={this.props.j_username} />
          <input type="hidden" name="j_password"  value={this.props.j_password} />
        </form>
        <iframe
          name="showZip"
          width="100%"
          height="380px"
          // sandbox="allow-scripts allow-same-origin"
          ref={this.iFrameRef}
        ></iframe>
      </div>
      );
    }
  }
const mapStateToProps = (state) => {
  console.log(state);
  return {
    url: state.PlatformLog.loginUrl,
    j_password: state.PlatformLog.loginPassword,
    j_username: state.PlatformLog.loginUserName,
  }
}
export default connect(mapStateToProps)(CDHLog)

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
