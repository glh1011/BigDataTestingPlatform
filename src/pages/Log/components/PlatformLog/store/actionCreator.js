import * as constants from './constants';
import { 
  toOpenStackAxios,
  toClouderaClusterAxios,
  findAllAxios
 } from '../../../../../api/log';
 import { findDetailByUserAxios } from '../../../../../api/resource'

const changeLogList = (PlatformLog, total, cluserName) => ({
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
  return (dispatch) => {
    toOpenStackAxios().then((res) => {
      dispatch(changeUrl(res.data.data));
    })
  }
}
export const getJumpList = (value) => {
  return (dispatch) => {
    toClouderaClusterAxios(value).then((res) => {
      console.log("res")
      console.log(res)
      if(res.data){
      const j_password = res.data.data.param.j_password;
      const j_username = res.data.data.param.j_username;
      const url1=res.data.data.url
      localStorage.setItem('url',url1);
      localStorage.setItem('j_password',j_password);
      localStorage.setItem('j_username',j_username)}
    })
    }
  }
export const getCluserName = (userName) => {
  return (dispatch) => {
    findDetailByUserAxios(userName).then((res) => {
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
  return (dispatch) => {
    findAllAxios(current, pageSize).then((res) => {
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