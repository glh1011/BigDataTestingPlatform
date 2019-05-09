import axios from '../../../utils/request';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';

//重置state
 export const resetState = () => ({
	 type: constants.RESET_STATE
 })  


// 资源池查看
const changeFirstLevelResourceList = (firstLevelResourceList, total) => ({
	type: constants.CHANGE_FIRST_LEVEL_LIST,
	resourcePoolList: firstLevelResourceList,
	resourcePoolListTotal: total,
});

const changeAdminResource = (adminResource) => ({
	type: constants.CHANGE_ADMAIN_RESOURCE,
	resourceUseData : adminResource,
})

export const getFirstLevelResourceList = (current) => {
	console.log("获取一级资源");
  return (dispatch) => {
		axios.get('/api/info/findAllFirstInfo?pageNum=' + current + '&pageSize=10').then((res) => {		
			console.log(res);
			if(res.data.meta.success){
				const result = res.data.data.list;
				console.log(result);
				const total = res.data.data.pages;
				console.log(total);
				dispatch(changeFirstLevelResourceList(result, total));
			}
			else{
				Feedback.toast.error("获取一级资源池列表出错");
			}	
		});
	}
}

export const getAdmainResource = () => {
	return (dispatch) => {
		axios.get('/api/info/findAllAdminInfo?pageNum=1&pageSize=10').then((res)=>{
			if(res.data.meta.success){
				const result = res.data.data.list;
				console.log("adminResource:" + result);
				dispatch(changeAdminResource(result));
			}
			else{
				Feedback.toast.error("获取资源池信息出错");
			}
		});
	}
}

const changeFirstLevelUser = (result) => ({
	type: constants.CHANGE_FIRST_LEVEL_USER,
	data: result,
})

//分配一级资源池, 获取无资源池的一级用户
export const getFirstLevelUserWithoutResource = () => {
	return (dispatch) => {
		axios.get('/api/allocation/findFirstWithoutResource').then(
			function (res) {
				console.log(res);
				if(res.data.meta.success){
					const result =[];
					res.data.data.map((item) => {
						result.push(item.userName);
					});
					console.log(result);
					dispatch(changeFirstLevelUser(result));
				}
				else{
					Feedback.toast.error("获取无资源池的一级用户失败");
				}
		});
	}
	
}
//分配一级资源池, input改变时改变state
export const changeAllocateInputValue = (userName, cpu, memory, disk) => ({
	type: constants.CHANGE_ALLOCATE_INPUTVALUE,
	userName,
	cpu,
	memory,
	disk
})
//分配一级资源池
export const submitAllocateForm = (username, cpu, memory, disk, history) => {
	return (dispatch) => {
		const url = '/api/allocation/allocateResourceToFirst?totalCpu='+cpu+'&totalMem='+memory+'&totalDisk='+disk+'&username='+username;
		console.log(url);
		axios.post(url)
			.then(
				function (response) {
					console.log(response);
					if(response.data.meta.success){
						Feedback.toast.success("一级资源池分配成功");
						history.goBack();
					}
					else if(response.data.meta.message==='资源不够充足'){
						Feedback.toast.error(response.data.meta.message);
					}
					else{
						Feedback.toast.error("一级资源池分配失败");
					}	
				}
			)
			.catch(function (error) {
				console.log("Oops!"+error);
		});
	}		
}
//回收一级资源池
export const recycleResourcePool = (userName, current) => {
	let that = this;
	console.log('回收要开始啦');
	Feedback.toast.loading("正在回收");
	return(dispatch) => {
		axios.post('/api/delete/deleteFirst?userName='+userName).then((res) => {
			console.log(res.data.meta.success);
      if(res.data.meta.success){
				Feedback.toast.success("一级资源池回收成功");
				dispatch(getAdmainResource());
				dispatch(getFirstLevelResourceList(current));
			}
			else{
				Feedback.toast.error("一级资源池回收失败");
			}
		})
	}
}

//一级资源池管理
const changeClusterList = (clusterList, total) => ({
	type: constants.CHANGE_CLUSTER_LIST,
	clusterList,
	clusterListTotal: total,
});

const changeFirstLevelResource = (firstLevelResource) => ({
	type: constants.CHANGE_FIRST_LEVEL_RESOURCE,
	resourceUseData : firstLevelResource,
})
//查看集群列表
export const getClusterList = (current, username) => {
	console.log(username);
  return (dispatch) => {
		axios.get('/api/info/findAllClusterInfo?pageNum=' + current + '&pageSize=10&username=' + username).then((res) => {
			console.log(res);
			if(res.data.meta.success){
				const result = res.data.data.list;
				console.log(result);
				const total = res.data.data.pages;
				console.log(total);
				dispatch(changeClusterList(result, total));
			}
			else{
				Feedback.toast.error("获取集群列表失败");
			}
		});
	}
}
//查看username对应的那个一级资源
export const getFirstLevelResource = (username) => {
	return (dispatch) => {
		axios.get('/api/info/findOneFirstInfo?username=' + username).then((res)=>{
			if(res.data.meta.success){
				const result = res.data.data;
				console.log(result);
				var a = [result];
				console.log(a);
				dispatch(changeFirstLevelResource(a));
			}
			else{
				Feedback.toast.error("获取一级资源池信息出错");
			}
		});
	}
}


//集群资源管理
//查看与集群不关联的二级用户
const changeUnboundSecondLevelUser = (result) => ({
	type: constants.CHANGE_UNBOUND_SECOND_LEVEL_USER,
	unboundSecondUser: result
})

export const getUnboundSecondUser = (clusterName) => {
  return (dispatch) => {
		axios.get('/api/allocation/findSecondWithoutConnect?clusterName=' + clusterName)
		  .then( (res) => {
				console.log(res);
				if(res.data.meta.success){
					const result =[];
					res.data.data.map((item) => {
						result.push(item.userName);
					});
					console.log(result);
					dispatch(changeUnboundSecondLevelUser(result));
				}
				else{
					Feedback.toast.error('获取未绑定二级用户失败');
				}
			})
	}
}

//提交绑定集群用户
export const submitAssignClusterUser = (value, clusterName, history) => {
	console.log(value);
	console.log(clusterName);
	const url = '/api/allocation/assignRole?clusterName='+ clusterName +'&users=' + value ;
	console.log(url);
	return (dispatch) => {
    axios.post(url)
    .then(function (response) {
			console.log(response.data.meta.success);
      if(response.data.meta.success){
        Feedback.toast.success('绑定集群成功！');
        history.goBack();
			}
			else{
        Feedback.toast.error('绑定集群失败！');
      }
    })
    .catch(function (error) {
    console.log(error);
    });
  }
}

//解绑
//查看与集群关联的二级用户
const changeBoundSecondLevelUser = (result) => ({
	type: constants.CHANGE_BOUND_SECOND_LEVEL_USER,
	boundSecondUser: result
})

export const getBoundSecondUser = (clusterName) => {
  return (dispatch) => {
		axios.get('/api/allocation/findSecondConnect?clusterName=' + clusterName)
		  .then( (res) => {
				console.log(res);
				if(res.data.meta.success){
					const result =[];
					res.data.data.map((item) => {
						result.push(item.userName);
					});
					console.log(result);
					dispatch(changeBoundSecondLevelUser(result));
				}
				else{
					Feedback.toast.error('获取已绑定二级用户失败');
				}
			})
	}
}

//提交解绑集群用户
export const submitUnassignClusterUser = (value, clusterName, history) => {
	console.log(value);
	console.log(clusterName);
	const url = '/api/allocation/unassignRole?clusterName='+ clusterName +'&users=' + value ;
	console.log(url);
	return (dispatch) => {
    axios.post(url)
    .then(function (response) {
			console.log(response.data.meta.success);
      if(response.data.meta.success){
        Feedback.toast.success('解绑集群成功！');
        history.goBack();
			}
			else{
        Feedback.toast.error('解绑集群失败！');
      }
    })
    .catch(function (error) {
    console.log(error);
    });
  }
}

//回收集群
export const recycleCluster = (clusterName, userName, current) => {
	console.log(userName);
	let that = this;
	console.log('回收要开始啦');
	Feedback.toast.loading("正在回收");
	return(dispatch) => {
		axios.post('/api/delete/deleteCluster?clusterName='+clusterName).then((res) => {
			console.log(res);
      if(res.data.meta.success){
				Feedback.toast.success("集群回收成功");
				dispatch(getFirstLevelResource(userName));
				dispatch(getClusterList(current, userName));
			}
			else{
				Feedback.toast.error("集群回收失败");
			}
		})
	}
}