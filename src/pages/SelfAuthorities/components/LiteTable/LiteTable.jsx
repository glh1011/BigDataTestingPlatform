import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import axios from 'axios';
import { connect } from 'react-redux';





class LiteTable extends Component {
  static displayName = 'LiteTable';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="lite-table">
        <IceContainer>
        <h3 style={styles.header}>个人权限</h3>
        <div>
          {(this.props.tableData || []).map((item, index) => {
            return (
              // <div key={index}>{item}</div>
              <div key={index} style={styles.permissionItem}>
                <div>
                  <span style={styles.permissionName}>{item}</span>
                </div>
              </div>
            )
          })
          }
        </div>
        
          {/* 对象转数组Array.from() */}
          {/* <Table dataSource={Array.from(this.props.tableData)} hasBorder={false}>
            <Table.Column title="权限名称" dataIndex="0" width={100} />
            <Table.Column title="权限描述" dataIndex="description" width={100} />
            <Table.Column title="创建者" dataIndex="creator" width={100} />
          </Table> */}
        </IceContainer>
      </div>
    );
  }

  componentDidMount() {
    var id = parseInt(localStorage.getItem('userId'));
    var url = 'http://192.168.0.216:8080/permission/queryPermissions?id='+id;
    axios.get(url)
    .then((res)=>{
      const action = {
        type: 'dispaly_self_authorities',
        tableData: res.data.data.list
      }
      this.props.displaySelfAuthorities(action);
    })
    .catch(e => console.log("Oops, error", e))
  }
}

const mapStateToProps = (state) => {
  return {
    tableData: state.selfAuthorities.tableData
  }
}

const mapDispatch = (dispatch) => ({
  displaySelfAuthorities(action) {
    dispatch(action);
  }
})

export default connect(mapStateToProps, mapDispatch)(LiteTable)

const styles = {
  header: {
    fontSize: 16,
    lineHeight: '16px',
    paddingBottom: 15,
    fontWeight: 700,
  },
  permissionItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #fafafa',
    lineHeight: '45px',
    height: 45,
    paddingLeft: '20px',
    textDecoration: 'none',
  },
  permissionName: {
    color: '#333',
  }
}