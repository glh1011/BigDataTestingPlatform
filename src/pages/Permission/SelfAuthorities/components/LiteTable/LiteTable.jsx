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
    var url = 'http://192.168.0.129:8080/permission/queryPermissions?id='+id;
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