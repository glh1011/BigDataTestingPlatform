import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/';

class DetailTable extends Component {
  static displayName = 'DetailTable';

  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {
    console.log(this.props);
    //console.log(this.props.location.state.id);
    this.props.getUserInfo();
  }

  render() {
    console.log("3333333333");
    console.log(this.props.subUserInfo);
    // console.log(this.props.location);
    // console.log(this.props.location.state);
    // if(typeof(this.props.location.state) == "undefined"){
    //   console.log("id未定义");
    // }else{
    //   console.log(this.props.location.state);
    // }
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
              {/* <li style={styles.detailItem}>
                <div style={styles.detailTitle}>id:</div>
                <div style={styles.detailBody}>{typeof(this.props.location.state)=='undefined'?localStorage.getItem('subUserId'):this.props.location.state.id}</div>
              </li> */}
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
  //console.log(state.route.location);
  console.log(state.subUserDetail.subUserInfo);
  // if(typeof(state.route.location.state)!='undefined'){
  //   localStorage.setItem('subUserId',state.route.location.state.id);
  // }
    return ({
      //location: state.route.location,
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
