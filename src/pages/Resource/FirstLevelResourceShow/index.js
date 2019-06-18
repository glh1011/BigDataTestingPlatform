import React, { Component } from 'react';
import CustomPieChart from '../components/CustomPieChart';
import OverviewInfo from '../components/OverviewInfo';
import ClusterTable from '../components/ClusterTable';
import { Button, Icon } from '@icedesign/base';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { actionCreators } from '../store';

class FirstLevelResourceShow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  renderAddBtn = () => {
    const userLevel = localStorage.getItem('userLevel');
    if(userLevel==1) {
      return (
        <div style={styles.btnContainer}>
        <Link to="/VisInstall/createMV">
          <Button size="small" style={styles.batchBtn}>
            <Icon type="add" />新建集群
          </Button>
        </Link>
      </div>
      )
    }  
  }

  render() {
    console.log('render');
    return (
      <div className="source-show-page">
        <div style={styles.IceContainer}>
          {/* <h3 style={{fontSize: 16,fontWeight: 700,}}>一级资源管理</h3> */}
          <span style={styles.formTitle}>一级资源管理</span>
          { this.renderAddBtn() }
          {/* <Button 
            type="primary" 
            onClick={() => { window.location.href = '/#/Resource/Install'; }}
            style={{float:'right',marginTop: '-32px'}}
          >
            新建集群
          </Button> */}
        </div>
        <div className="pie-chart-container" style={styles.pieChartContainer} >
          <CustomPieChart name="CPU" />
          <CustomPieChart name="memory" />
          <CustomPieChart name="disk" />
        </div>
        <div className="overview-info-container" style={styles.overviewInfoContainer} >
          <OverviewInfo name="CPU" />
          <OverviewInfo name="memory" />
          <OverviewInfo name="disk" />
        </div>
        <ClusterTable />
      </div>
    );
  }
  componentDidMount(){
    console.log(localStorage);
    let userName = localStorage.getItem('userName');
    if(localStorage.getItem('selectUserName')){
      userName = localStorage.getItem('selectUserName')
    }
    console.log(userName);
    this.props.showClusterList(this.props.current, userName);
    this.props.showFirstLevelResource(userName);
  }
}

const mapState = (state) => ({
  current: state.Resource.clusterListCurrent,
})

const mapDispatch = (dispatch) => ({
  showClusterList(current, username) {
    dispatch(actionCreators.getClusterList(current, username));
  },
  showFirstLevelResource(username) {
    dispatch(actionCreators.getFirstLevelResource(username));
  }
})


export default connect(mapState, mapDispatch)(FirstLevelResourceShow);


const styles = {
  // header: {
  //   overflow: 'hidden',
  //   background: '#fff',
  //   borderRadius: '5px',
  //   margin: 0,
  //   padding: '20px',
  //   paddingBottom: '27px',
  // },
  IceContainer: {
    background: 'rgb(255, 255, 255)',
    borderRadius: '6px',
    padding: '20px',
    marginBottom: '20px',
    minHeight: 'auto',
    justifyContent: 'space-between',
  },
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
    fontSize: '14px',
    height: '26px',
  },
  pieChartContainer: {
    overflow: 'hidden',
    background: '#fff',
    marginTop: '20px',
  },
  overviewInfoContainer: {
    overflow: 'hidden',
    background: '#fff',
  },
}
