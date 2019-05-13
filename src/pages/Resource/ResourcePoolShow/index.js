import React, { Component } from 'react';
import CustomPieChart from '../components/CustomPieChart';
import OverviewInfo from '../components/OverviewInfo';
import ResourceTable from '../components/ResourceTable';
import { Button, Dialog, Icon } from '@icedesign/base';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

class ResourcePoolShow extends Component {
  renderAddBtn = () => {
    return (
      <div style={styles.btnContainer}>
      <Link to="/Resource/AllocateResourcePool">
        <Button size="small" style={styles.batchBtn}>
          <Icon type="add" />新建一级资源池
        </Button>
      </Link>
    </div>
    )
  }
  render() {
    console.log('render');
    return (
      <div className="source-show-page" style={{minWidth:'600px'}}>
        <div style={styles.IceContainer}>
          <span style={styles.formTitle}>资源池管理</span>
          {this.renderAddBtn()}
          {/* <Button 
            type="primary" 
            onClick={() => { window.location.href = '/#/Resource/AllocateResourcePool'; }}
            style={{float:'right',marginTop: '-32px'}}
          >
            分配资源池
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
        <ResourceTable />
      </div>
    );
  }
  componentDidMount(){
    this.props.showResourceList();
    this.props.showAdmainResource();
  }
}

const mapState = (state) => ({
  current: state.Resource.resourcePoolListCurrent,
})

const mapDispatch = (dispatch) => ({
  showResourceList() {
    let pageNum = 1;
    dispatch(actionCreators.getFirstLevelResourceList(pageNum));
  },
  showAdmainResource() {
    dispatch(actionCreators.getAdmainResource());
  }
})


export default connect(mapState, mapDispatch)(ResourcePoolShow);


const styles = {
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
