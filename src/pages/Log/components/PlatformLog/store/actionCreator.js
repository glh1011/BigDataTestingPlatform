import axios from '../../../../../utils/request';
import * as constants from './constants';

const changeLogList = (PlatformLog, total,cluserName) => ({
  type: constants.CHANGELOGLIST,
  PlatformLog,
  total,
})
const changeCluserName = (cluserName) => ({
   type: constants.CHANGECLUSERNAME,
   cluserName
})
const changeUrl = (url) => ({
   type: constants.CHANGEURL,
   url
})

export const changeUrlLog = () => {
  var url = '/api/jump/toOpenStack';
  return (dispatch) => {
    axios.get(url).then((res) => {
      dispatch(changeUrl(res.data.data));
    })
  }
}
export const getJumpList = (value) => {
  console.log(value)
  var url = '/api/jump/toClouderaCluster?clusterName	='+value;
  return (dispatch) => {
    axios.get(url).then((res) => {
      console.log("res")
      console.log(res)
      // try{
      if(res.data){
      const j_password = res.data.data.param.j_password;
      const j_username = res.data.data.param.j_username;
      const url1=res.data.data.url
      // const j_password='admin';
      // const j_username='admin';
      // const url1="http://192.168.0.74:8180/j_spring_security_check";
      localStorage.setItem('url',url1);
      localStorage.setItem('j_password',j_password);
      localStorage.setItem('j_username',j_username)}
    // }catch{
    //    console.log("Oops!"+error);
    //   }
    })
    }
  }
export const getCluserName = (userName) => {
   var url = '/api/userCluster/findDetailByUser?userName='+userName;
  return (dispatch) => {
    axios.get(url).then((res) => {
      const cluserName=[];
      if(res&&res.data){
      const cluserNameSize = res.data.data.length;
      console.log(cluserNameSize)
      for(let i=0;i<cluserNameSize;i++) {
        const cluster=res.data.data[i].clusterName
        console.log(cluster)
        cluserName.push({label:cluster, value:cluster});
      }}
      console.log(cluserName)
      dispatch(changeCluserName(cluserName));
    })
 }
}

export const getAllLogList = (current) => {
  var pageSize = 10;
  var url = '/api/logs/findAll?pageNum='+current+"&pageSize="+pageSize;
  return (dispatch) => {
    axios.get(url).then((res) => {
      if(res){
        if(res.data.data){
          const PlatformLog = res.data.data.list;
          const total = res.data.data.total;
          dispatch(changeLogList(PlatformLog, total));
        }
      }
    })
  }
}