import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';

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
          info.backup = 0;
        }
      break;
      case "memory":
        {
          info.name = "memory";
          info.total = data.resourceUseData[0].totalMem;
          info.used = data.resourceUseData[0].usedMem;
          info.usable = data.resourceUseData[0].totalMem-data.resourceUseData[0].usedMem;
          info.backup = 0;
        }
      break;
      case "disk":
        {
          info.name = "disk";
          info.total = data.resourceUseData[0].totalDisk;
          info.used = data.resourceUseData[0].usedDisk;
          info.usable = data.resourceUseData[0].totalDisk-data.resourceUseData[0].usedDisk;
          info.backup = 0;
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
    const backup = info.backup;
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
        formatter: '{b} ({c})',
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
            {
              value: backup,
              name: '预留',
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
              formatter: '{b} ({c})',
            },
          },
          labelLine: {
            normal: {
              show: false,
              length: 10,
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
            {
              value: backup,
              name: '预留',
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: '#37A2DA',
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
        backup:'',
      };
      this.getInfo(this.props, info);
      return (
        <div className="custom-pie-chart" style={styles.customPieChart}>
          <IceContainer style={{borderRadius: 0,}}>
            <ReactEcharts option={this.getOption(info)} />
          </IceContainer>
        </div>
      );
    }
    else{
      return(<div></div>);
    } 
  }
}

const mapState = (state) => {
  console.log(state.Resource.resourceUseData);
  return {
    resourceUseData: state.Resource.resourceUseData,
  }
}

export default connect(mapState, null)(CustomPieChart);

const styles = {
  customPieChart: {
    float: 'left',
    marginLeft: '5%',
    width: '26%',
    height: '20%',
    minWidth: 300,
  }
}
