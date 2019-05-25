import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import { actionCreators } from '../../store';

/**
 * 图表来源参考：http://gallery.echartsjs.com/editor.html?c=xBJSFJgFFf
 */
class CustomPieChart extends Component {
  static displayName = 'CustomPieChart';
  
  getInfo(data, info){
    console.log(data);
    switch(data.name){
      case "CPU":
        {
          info.name = "CPU";
          info.total = data.resourceUseData[0].totalCpu;
          info.used = data.resourceUseData[0].usedCpu;
          info.usable = data.resourceUseData[0].totalCpu-data.resourceUseData[0].usedCpu;
        }
      break;
      case "memory":
        {
          info.name = "memory";
          info.total = data.resourceUseData[0].totalMem;
          info.used = data.resourceUseData[0].usedMem;
          info.usable = data.resourceUseData[0].totalMem-data.resourceUseData[0].usedMem;
        }
      break;
      case "disk":
        {
          info.name = "disk";
          info.total = data.resourceUseData[0].totalDisk;
          info.used = data.resourceUseData[0].usedDisk;
          info.usable = data.resourceUseData[0].totalDisk-data.resourceUseData[0].usedDisk;
        }
      break;
      default:
      break;
    }
    console.log(info);
  }

  getOption = (info) => {
    console.log(info);
    const used = info.used;
    const usable = info.usable;
    console.log(used);
    const colorList = ['#FFDB5C', '#9FE6B8', '#37A2DA'];
    return {
      backgroundColor: '#fff',
      title: {
        text: info.name,
        x: 'center',
        top: '10%',
      },
      tooltip: {
        formatter: '{b}({c})',
      },
      series: [
        // CPU
        {
          name: info.name,
          type: 'pie',
          radius: '60%',
          center: ['50%', '60%'],
          clockwise: false,
          data: [
            {
              value: used,
              name: '已使用',
            },
            {
              value: usable,
              name: '可用',
            },
          ],
          itemStyle: {
            normal: {
              color: (params) => {
                return colorList[params.dataIndex];
              },
            },
          },
          label: {
            normal: {
              show: true,
              formatter: '{b}({c})',
              align: 'right',
            },
          },
          labelLine: {
            normal: {
              show: false,
              length: 2,
              length2: 10,
            },
          },
        },
        {
          name: info.name + '外圈',
          type: 'pie',
          radius: ['65%', '65%'],
          center: ['50%', '60%'],
          clockwise: false,
          hoverAnimation: false,
          data: [
            {
              value: 4,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  color: 'rgba(0, 0, 0, 0)',
                },
              },
            },
            {
              value: used,
              name: '已使用',
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: '#FFDB5C',
                },
              },
            },
            {
              value: 4,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  color: 'rgba(0, 0, 0, 0)',
                },
              },
            },
            {
              value: usable,
              name: '可用',
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: '#9FE6B8',
                },
              },
            },
            {
              value: 4,
              name: '',
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  color: 'rgba(0, 0, 0, 0)',
                },
              },
            },
          ],

          label: {
            normal: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
        },
      ],
    };
  };

  render() {
    var { resourceUseData } = this.props;

    if(resourceUseData[0]){
      let info = {
        name:'',
        total:'',
        used:'',
        usable:'',
      };
      this.getInfo(this.props, info);
      return (
        <div className="custom-pie-chart" style={styles.customPieChart}>
          {/* <IceContainer style={{borderRadius: 0, border:'1px solid #000'}}> */}
            <ReactEcharts option={this.getOption(info)} style={{borderRadius: 0,width: '100%', }}/>
          {/* </IceContainer> */}
        </div>
      );
    }
    else{
      return(<div></div>);
    } 
  };
  componentWillUnmount() {
    this.props.resetState();
  }
};

const mapState = (state) => {
  return {
    resourceUseData: state.Resource.resourceUseData,
  }
}

const mapDispatch = (dispatch) => ({
  resetState() {
    dispatch(actionCreators.resetState());
  },
})

export default connect(mapState, mapDispatch)(CustomPieChart);

const styles = {
  customPieChart: {
    float: 'left',
    marginLeft: '1%',
    marginRight: '1%',
    width: '30%',
    height: '20%',
    minWidth: 300,
  }
}
