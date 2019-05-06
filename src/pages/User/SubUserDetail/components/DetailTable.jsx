import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

class DetailTable extends Component {

  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    const { subUserInfo } = this.props;
    if(typeof(this.props.subUserInfo)!="undefined"){
      return (
        <div className="detail-table">
          <IceContainer title="人员详细信息">
            <ul style={styles.detailTable}>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>登录名：</div>
                <div style={styles.detailBody}>{subUserInfo.userName}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>用户等级：</div>
                <div style={styles.detailBody}>{subUserInfo.userLevel}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>姓名：</div>
                <div style={styles.detailBody}>{subUserInfo.name}</div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>上级id：</div>
                <div style={styles.detailBody}>
                  <span style={styles.statusProcessing}>{subUserInfo.superiorUserId}</span>
                </div>
              </li>
              <li style={styles.detailItem}>
                <div style={styles.detailTitle}>邮箱：</div>
                <div style={styles.detailBody}>
                {subUserInfo.email}
                </div>
              </li>
            </ul>
          </IceContainer>
        </div>
      );
    }else{
      return (<div></div>);
    }

  }
}

const mapStateToProps = (state) => {
    return ({
      subUserInfo: state.subUserDetail.subUserInfo.data
    })
}

const mapDispatchToProps = (dispatch) => ({
  getUserInfo() {
    dispatch(actionCreators.getUserDetail());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailTable);

const styles = {
  detailItem: {
    padding: '15px 0px',
    display: 'flex',
    borderTop: '1px solid #EEEFF3',
  },
  detailTitle: {
    marginRight: '30px',
    textAlign: 'right',
    width: '120px',
    color: '#999999',
  },
  detailBody: {
    flex: 1,
  },
  statusProcessing: {
    color: '#64D874',
  },
};
