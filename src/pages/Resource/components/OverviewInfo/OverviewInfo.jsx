import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Grid } from '@icedesign/base';
import { connect } from 'react-redux';

const { Row, Col } = Grid;

class OverviewInfo extends Component {
  static displayName = 'OverviewInfo';
  
  getInfo(data, info) {
    switch(data.name) {
      case "CPU":
        {
          info.total = data.resourceUseData[0].totalCpu + "个";
          info.used = data.resourceUseData[0].usedCpu + "个";
          info.usable = data.resourceUseData[0].totalCpu-data.resourceUseData[0].usedCpu + "个";
        }
      break;
      case "memory":
        {
          info.total = data.resourceUseData[0].totalMem + "GB";
          info.used = data.resourceUseData[0].usedMem + "GB";
          info.usable = data.resourceUseData[0].totalMem-data.resourceUseData[0].usedMem + "GB";
        }
      break;
      case "disk":
        {
          info.total = data.resourceUseData[0].totalDisk + "GB";
          info.used = data.resourceUseData[0].usedDisk + "GB";
          info.usable = data.resourceUseData[0].totalDisk-data.resourceUseData[0].usedDisk + "GB";
        }
      break;
      default:
      break;
    }
    console.log(info);
  }

  render() {
    const { resourceUseData } = this.props;
    if(resourceUseData[0]){
      let info = {
        total:'',
        used:'',
        usable:'',
      };
      this.getInfo(this.props, info);
      return (
        <Row wrap gutter={20} style={styles.row}>
            <IceContainer style={styles.container}>
              <ul style={styles.summary}>
                <li style={styles.item}>
                  <span style={styles.label}>总量：</span>
                  <span style={styles.value}>
                    {info.total}
                  </span>
                </li>
                <li style={styles.item}>
                  <span style={styles.label}>已使用：</span>
                  <span style={styles.value}>{info.used}</span>
                </li>
                <li style={styles.item}>
                  <span style={styles.label}>可用：</span>
                  <span style={styles.value}>{info.usable}</span>
                </li>
              </ul>
            </IceContainer>
        </Row>
      );
    }
    else{
      return(<div></div>);
    }  
  }
}

const mapState = (state) => {
  return {
    resourceUseData: state.Resource.resourceUseData,
  }
}

export default connect(mapState, null)(OverviewInfo);

const styles = {
  row: {
    float: 'left',
    marginLeft: '1%',
    marginRight: '1%',
    width: '30%',
    marginBottom: '2%',
    minWidth: 280,
  },
  container: {
    margin: '0',
    padding: '0',
    width: 340,
    height: 150,
    borderRadius: 0,
    width: '100%',
  },
  summary: {
    position: 'relative',
    width: '200px',
    left: '50%',
    marginLeft: '-100px',
    padding: '10px',
  },
  item: {
    padding: '5px',
    height: '28px',
    lineHeight: '32px',
    textAlign: 'center', 
  },
  label: {
    display: 'inline-block',
    fontWeight: '500',
    minWidth: '74px',
  },
};
