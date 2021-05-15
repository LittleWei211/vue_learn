import axios from "axios"
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
});

//let url ="http://83.25.142.133:8080/api";//测试
let url ="http://83.252.55.17:80/api";//生产

//请求项目组件列表的数据接口3
export let getAppList = (page,searchWord)=>{
  return axios.get(url+'/getApps',{
    params:{
      "currPage":page,
      "envName":searchWord
    }
  })
}

//获取应用总数的接口10
export let getAppsCount = (searchWord)=>{
  return axios.get(url+"/getAppsCount",{
    params:{
      "envName":searchWord
    }
  })
}

//请求项目基本信息数据接口
export let getAppBasicInfo = (id)=>{
  return axios.get(url+'/getAppBaseInfo',{//后台接口
    params:{
      "envId":id
    }
  })
}

//获取扫描动态数据接口
export  let getAppRunInfos = (id)=>{
  return axios.get(url+'/getAppRunInfos',{//后台接口
    params:{
      "envId":id
    }
  })
}

//获取漏洞分布top10
export  let getVulDistribution = (id)=>{
  return axios.get(url+'/getVulDistribution',{//后台接口
    params:{
      "envId":id
    }
  })
}

//获取漏洞等级
export let getVulStatus = (id)=>{
  return axios.get(url+'/getVulStatus',{//后台接口
    params:{
      "envId":id
    }
  })
}


//getVulList获取应用页的漏洞列表信息
export let getVulListByApp = (id,vulName,vulState,vulVerserity,page)=>{
  return axios.get(url+'/getVulListByApp',{
    params:{
      "envId":id,
      "vulName":vulName,
      "vulState":vulState,
      "vulVerserity":vulVerserity,
      "page":page
    }
  })
}

//getVulList获取应用页的漏洞总数量
export let getVulCountByApp = (id,vulName,vulState,vulVerserity)=>{
  return axios.get(url+'/getVulListCountByApp',{
    params:{
      "envId":id,
      "vulName":vulName,
      "vulState":vulState,
      "vulVerserity":vulVerserity
    }
  })
}

//getVulList获取漏洞页的漏洞列表信息
export let getVulList = (userNo,vulName,appName,state,vulId,vulVerserity,testStartTime,testEndTime,page)=>{
  return axios.get(url+'/getVulList',{
    params:{
      "userNo":userNo,
      "vulName":vulName,
      "appName":appName,
      "vulState":state,
      "vulId":vulId,
      "vulVerserity":vulVerserity,
      "testStartTime":testStartTime,
      "testEndTime":testEndTime,
      "page":page
    }
  })
}

//getVulList获取漏洞页的漏洞总数量
export let getVulListCount = (userNo,vulName,appName,state,vulId,vulVerserity,testStartTime,testEndTime)=>{
  return axios.get(url+'/getVulListCount',{
    params:{
      "userNo":userNo,
      "vulName":vulName,
      "appName":appName,
      "vulState":state,
      "vulId":vulId,
      "vulVerserity":vulVerserity,
      "testStartTime":testStartTime,
      "testEndTime":testEndTime
    }
  })
}



//获取总的应用信息，项目数，任务数，请求数，漏洞数
export let getTotalInfo = ()=>{
  return axios.get(url+'/getTotalInfo')
}

//获取总的应用漏洞top5
export let getTopFiveApp = ()=>{
  return axios.get(url+'/getTopFiveApp')
}


//请求漏洞概述接口
export let getVulSummary = (vulId)=>{
  return axios.get(url+'/getVulSummary',{
    params:{
      vulId:vulId
    }
  })//后台接口
}

//获取任务列表接口
export let getTaskList = (taskId,userId,taskStatus,page)=>{
  return axios.get(url+'/getTaskList',{
    params:{
      taskId:taskId,
      userNo:userId,
      taskStatus:taskStatus,
      page:page
    }
  })
}

//获取任务总数量，默认获取所有任务的总数量，当传入了userId则获取改用户的任务数量
export let getTaskCount = (taskId,userId,taskStatus)=>{
  return axios.get(url+'/getTaskListCount',{
    params:{
      taskId:taskId,
      userNo:userId,
      taskStatus:taskStatus
    }
  })
}

//任务详情基础信息
export let getTaskDetail = (taskId)=>{
  return axios.get(url+'/getTaskDetail',{
    params:{
      taskId:taskId
    }
  })
}

//获取请求列表接口
export let getRequestList = (taskId,page)=>{
  return axios.get(url+'/getRequestList',{
    params:{
      taskId:taskId,
      page:page
    }
  })
}

//获取对应任务下的请求总数量
export let getRequestCount = (taskId)=>{
  return axios.get(url+'/getRequestListCount',{
    params:{
      taskId:taskId
    }
  })
}

////获取请求详情
export let getRequestDetail = (requestId)=>{
  return axios.get(url+'/getRequestDetail',{
    params:{
      requestId:requestId
    }
  })
}

//修改漏洞状态
/*export let changeVulStatus = (vulId,status)=>{
  return axios({
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    method:'post',
    url:url+'/changeVulStatus',
    data:{
      vulId:vulId,
      vulState:status
    }
  })
}*/

export let changeVulStatus = (vulId,status)=>{
  return axios.get(url+'/changeVulStatus',{
    params:{
      vulId:vulId,
      vulState:status
    }
  })
}

//getVulList获取应用页的漏洞列表信息
export let getVulListByTask = (taskId,vulName,vulState,vulVerserity,page)=>{
  return axios.get(url+'/getVulListByTask',{
    params:{
      "taskId":taskId,
      "vulName":vulName,
      "vulState":vulState,
      "vulVerserity":vulVerserity,
      "page":page
    }
  })
}

//getVulList获取应用页的漏洞总数量
export let getVulCountByTask = (taskId,vulName,vulState,vulVerserity)=>{
  return axios.get(url+'/getVulListCountByTask',{
    params:{
      "taskId":taskId,
      "vulName":vulName,
      "vulState":vulState,
      "vulVerserity":vulVerserity
    }
  })
}

//获取应用名称列表
export let getAppNames = ()=>{
  return axios.get(url+'/getAppNames')
}

//获取应用名称列表
export let getVulNames = ()=>{
  return axios.get(url+'/getVulNames')
}











