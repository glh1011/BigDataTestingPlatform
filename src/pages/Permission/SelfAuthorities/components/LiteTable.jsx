import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import axios from '../../../../utils/request';
import { connect } from 'react-redux';
import { Feedback } from '@icedesign/base';

class LiteTable extends Component {

  render() {
    return (
      <div className="lite-table">
        <IceContainer>
          <span style={styles.formTitle}>个人权限</span>
          <div>
            {(this.props.tableData || []).map((item, index) => {
              return (
                <div key={index} style={styles.permissionItem}>
                  <div>
                    <span style={styles.permissionName}>{item}</span>
                  </div>
                </div>
              )
            })
            }
          </div>
        </IceContainer>
      </div>
    );
  }

  componentDidMount() {
    var id = parseInt(localStorage.getItem('userId'));
    var url = '/api/permission/queryPermissions?id='+id+'&pageNum=1&pageSize=1000';
    axios.get(url)
    .then((res)=>{
      if(res.data.meta.success){
        const action = {
          type: 'dispaly_self_authorities',
          tableData: res.data.data.list
        }
        this.props.displaySelfAuthorities(action);
      }else if(res.data.meta.code === '403'){
        //Feedback.toast.error(res.data.meta.message);
      }
    })
    .catch(e => console.log("Oops, error", e))
  }

  componentWillUnmount() {
    this.props.resetSelfPermissionTable();
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
  },
  resetSelfPermissionTable() {
    const action = ({
      type: 'clear_permission_table',
    });
    dispatch(action);
  }
})

export default connect(mapStateToProps, mapDispatch)(LiteTable)

const styles = {
  formTitle: {
    display: 'inline-block',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '24px',
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