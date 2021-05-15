import Vue from 'vue'
import Router from 'vue-router'
import Application from '@/components/home/Application'
import Manage from '@/components/manage/Manage'
import LoopHoleList from '@/components/list/LoopHoleList'
import VulSummary from '@/components/vulSummary/VulSummary'
import TaskList from '@/components/taskList/TaskList'
import TaskDetail from '@/components/taskDetail/TaskDetail'
import RequestList from '@/components/requestList/RequestList'
import RequestDetail from '@/components/requestDetail/RequestDetail'

import Help from '@/components/help/Help'
import Instruction from '@/components/help/instruction/Instruction'
import ClientDownLoad from '@/components/help/download/ClientDownLoad'
import Update from '@/components/help/update/Update'
Vue.use(Router)

export default new Router({
  //mode:"history",
  base:"/iastweb",
  routes: [
    {
      path: '/',
      name: 'Application',
      component: Application
    },  
    {
      path: '/manage',
      name: 'Manage',
      component: Manage,
      meta:{title:'应用'}

    },
    {
      path:'/vulList',
      name:'LoopHoleList',
      component:LoopHoleList

    },
    {
      path:'/vulSummary',
      name:'VulSummary',
      component:VulSummary
    },
    {
      path:'/taskList',
      name:'TaskList',
      component:TaskList
    },
    {
      path:'/taskDetail',
      name:'TaskDetail',
      component:TaskDetail
    },
    {
      path:'/requestList',
      name:'RequestList',
      component:RequestList
    },
    {
      path:'/requestDetail',
      name:'RequestDetail',
      component:RequestDetail
    },
    {
      path:'/help',
      name:'Help',
      component:Help,
      children:[
        {
          path:'/help/instruction',
          name:'Instruction',
          component:Instruction,
          meta:{
            cName:'使用说明'
          }
        },
        {
          path:'/help/clientDownLoad',
          name:'ClientDownLoad',
          component:ClientDownLoad
        },
        {
          path:'/help/update',
          name:'Update',
          component:Update
        }
      ]
    }
  ]
})


