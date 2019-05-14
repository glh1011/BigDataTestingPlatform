import React, {
  Component
} from "react";
import MainData from "./components/MainData";
import EditableTable from './components/EditableTable';
import {
  defaultAxios,
  currentAxios
} from "../../api/visInstall";
export default class VisInstall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generatorData: [], //初始后端给的资源信息
      isLoaded: false,
      cpu: 0,
      mem: 0,
      disk: 0,
      currentLoaded: false
    };
  }
  componentDidMount() {
    // const _this = this; //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    defaultAxios()
      .then((response) => {
        if (response) {
          this.setState({
            generatorData: response.data.data,
            isLoaded: true
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoaded: false,
          error: error
        })
      })
    currentAxios()
      .then((response) => {
        if (response) {
          this.setState({
            cpu: response.data.data.cpu,
            mem: response.data.data.mem,
            disk: response.data.data.disk,
            currentLoaded: true
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          currentLoaded: false,
          error: error
        })
      })

  }
  render() {
    if (!this.state.isLoaded && !this.state.currentLoaded) {
      return ( < div > Loading < /div>)
      }
      else {
        return ( < div className = "vis-install-page" >
          <
          MainData cpu = {
            this.state.cpu
          }
          mem = {
            this.state.mem
          }
          disk = {
            this.state.disk
          }
          /> <
          EditableTable generatorData = {
            this.state.generatorData
          }
          cpu = {
            this.state.cpu
          }
          mem = {
            this.state.mem
          }
          disk = {
            this.state.disk
          }
          /> </div >
        );
      }
    }
  }
