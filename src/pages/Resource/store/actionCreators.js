import axios from '../../../utils/request';
import * as constants from './constants';
import { Feedback } from '@icedesign/base';
import { getAdmainResourceAxios, 
	getFirstLevelResourceListAxios,
	getFirstLevelUserWithoutResourceAxios,
	allocateFirstLevelResourceAxios,
	recycleResourcePoolAxios,
	getFirstLevelResourceAxios,
	getClusterListAxios,
	getUnboundSecondUserAxios,
	assignClusterUserAxios,
	getBoundSecondUserAxios,
	unAssignClusterUserAxios,
	recycleClusterAxios,
} from '../../../api/resource';

//重置state
 export const resetState = () => ({
	 type: constants.RESET_STATE
 })

//admin资源池管理饼图数据
const changeAdminResource = (adminResource) => ({
	type: constants.CHANGE_ADMAIN_RESOURCE,
	resourceUseData : adminResource,
})

export const getAdmainResource = () => {
	return (dispatch) => {
		getAdmainResourceAxios(1, 10).then(
			(res) => {
				if(res) {
					if(res.data.meta.success) {
						const result = res.data.data.list;
						console.log("adminResource:" + result);
						dispatch(changeAdminResource(result));
					}
					else {
						Feedback.toast.error("获取资源池信息出错");
					}				
			  }
			}
		)
	}
}

//admin资源池管理表格数据
const changeFirstLevelResourceList = (firstLevelResourceList, total) => ({
	type: constants.CHANGE_FIRST_LEVEL_LIST,
	resourcePoolList: firstLevelResourceList,
	resourcePoolListTotal: total,
});

export const getFirstLevelResourceList = (pageNum) => {
	console.log("获取一级资源");
  return (dispatch) => {
		getFirstLevelResourceListAxios(pageNum, 10).then(
			(res) => {
        if(res){
					if(res.data.meta.success){
						console.log(res.data.data);
						const result = res.data.data.list;
						console.log(result);
						const total = res.data.data.pages;
						console.log(total);
						dispatch(changeFirstLevelResourceList(result, total));
					}
					else{
						Feedback.toast.error("获取一级资源池列表出错");
					}	
				}
			}
		) 
	}
}

//admin分配一级资源池, 获取无资源池的一级用户并修改state
const changeFirstLevelUser = (result) => ({
	type: constants.CHANGE_FIRST_LEVEL_USER,
	data: result,
})

export const getFirstLevelUserWithoutResource = () => {
	return (dispatch) => {
		getFirstLevelUserWithoutResourceAxios().then(
			(res) => {
				if(res){
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
				}
			}
		)
	}
}

//admin分配一级资源池, input改变时改变state
export const changeAllocateInputValue = (userName, cpu, memory, disk) => ({
	type: constants.CHANGE_ALLOCATE_INPUTVALUE,
	userName,
	cpu,
	memory,
	disk
})

//admin分配一级资源池(dispatch还要作为参数吗？)
export const submitAllocateForm = (username, totalCpu, totalMem, totalDisk, history) => {
	return (dispatch) => {
		allocateFirstLevelResourceAxios(username, totalCpu, totalMem, totalDisk).then(
			(res) => {
				if(res){
					console.log(res);
					if(res.data.meta.success){
						Feedback.toast.success("一级资源池分配成功");
						history.goBack();
					}
					else if(res.data.meta.message==='资源不够充足'){
						Feedback.toast.error(res.data.meta.message);
					}
					else{
						Feedback.toast.error("一级资源池分配失败");
					}	
				}	
			}
		)
	}		
}


//admin回收一级资源池
export const recycleResourcePool = (username, pageNum) => {
	return (dispatch) => {
	  Feedback.toast.loading("正在回收");
	  recycleResourcePoolAxios(username).then(
		  (res) => {
        if(res){
					if(res.data.meta.success){
						Feedback.toast.success("一级资源池回收成功");
						dispatch(getAdmainResource());
						dispatch(getFirstLevelResourceList(pageNum));
					}
					else{
						Feedback.toast.error("一级资源池回收失败");
					}
				}
			}	
		)
	}

}

//一级资源池管理

//一级用户获取饼图数据并修改state
const changeFirstLevelResource = (firstLevelResource) => ({
	type: constants.CHANGE_FIRST_LEVEL_RESOURCE,
	resourceUseData : firstLevelResource,
})

export const getFirstLevelResource = (username) => {
	return (dispatch) => {
		getFirstLevelResourceAxios(username).then(
			(res) => {
				if(res){
					if(res.data.meta.success){
						const result = res.data.data;
						console.log(result);
						var a = [result];
						console.log(a);
						dispatch(changeFirstLevelResource(a));
					}
					else{
						Feedback.toast.error("获取一级资源池信息失败");
					}
				}				
			}
		)
	}
}

//一级用户获取表格数据，并修改state
const changeClusterList = (clusterList, total) => ({
	type: constants.CHANGE_CLUSTER_LIST,
	clusterList,
	clusterListTotal: total,
});

export const getClusterList = (pageNum, username) => {
  return (dispatch) => {
		getClusterListAxios(pageNum, username).then(
			(res) => {
				if(res){
					console.log(res);
					if(res.data.meta.success){
						let list = res.data.data.list;
						list.forEach(function(item){
							if(item.createTime != null){
								var d = new Date(item.createTime);
								var newCreateTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
								item.createTime = newCreateTime;
							}
						})
						const result = list;
						console.log(result);
						const total = res.data.data.pages;
						console.log(total);
						dispatch(changeClusterList(result, total));
					}
					else{
						Feedback.toast.error("获取集群列表失败");
					}
				}	
			}
		)

	}
}

//一级用户查看与集群不关联的二级用户,并修改state
const changeUnboundSecondLevelUser = (result) => ({
	type: constants.CHANGE_UNBOUND_SECOND_LEVEL_USER,
	unboundSecondUser: result
})

export const getUnboundSecondUser = (clusterName) => {
  return (dispatch) => {
    getUnboundSecondUserAxios(clusterName).then(
			(res) => {
				if(res){
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
				}
			}
		)
	}
}

//一级用户提交绑定集群用户
export const submitAssignClusterUser = (users, clusterName, history) => {
	return (dispatch) => {
		assignClusterUserAxios(users, clusterName).then(
			(res) => {
			  if(res){
					if(res.data.meta.success){
						Feedback.toast.success('绑定集群成功！');
						history.goBack();
					}
					else{
						Feedback.toast.error('绑定集群失败！');
					}
				}				
			}
		)
  }
}

//一级用户查看与集群关联的二级用户
const changeBoundSecondLevelUser = (result) => ({
	type: constants.CHANGE_BOUND_SECOND_LEVEL_USER,
	boundSecondUser: result
})

export const getBoundSecondUser = (clusterName) => {
  return (dispatch) => {
    getBoundSecondUserAxios(clusterName).then(
			(res) => {
				if(res){
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
				}			
			}
		)
	}
}

//一级用户提交解绑集群用户
export const submitUnassignClusterUser = (users, clusterName, history) => {
	// console.log(users);
	// console.log(clusterName);
	// const url = '/api/allocation/unassignRole?clusterName='+ clusterName +'&users=' + users ;
	// console.log(url);
	return (dispatch) => {
		unAssignClusterUserAxios(users, clusterName).then(
			(res) => {
				if(res){
					if(res.data.meta.success){
						Feedback.toast.success('解绑集群成功！');
						history.goBack();
					}
					else{
						Feedback.toast.error('解绑集群失败！');
					}
				}
			}
		)
  }
}

//一级用户回收集群
//更新LoadingVisible

const updateClusterTableLoadingVisible = (clusterTableLoadingVisible) => ({
	type: constants.UPDATE_CLUSTER_TABLE_LOADING_VISIBLE,
	clusterTableLoadingVisible
})

export const recycleCluster = (clusterName, userName, pageNum) => {
	// console.log(userName);
	// let that = this;
	// console.log('回收要开始啦');
	return(dispatch) => {
    dispatch(updateClusterTableLoadingVisible(true));
		recycleClusterAxios(clusterName).then(
			(res) => {
				if(res){
					if(res.data.meta.success){
						dispatch(updateClusterTableLoadingVisible(false));
						Feedback.toast.success("集群回收成功");
						dispatch(getFirstLevelResource(userName));
						dispatch(getClusterList(pageNum, userName));
					}
					else{
						Feedback.toast.error("集群回收失败");
					}
				}				
			}
		)
	}
}