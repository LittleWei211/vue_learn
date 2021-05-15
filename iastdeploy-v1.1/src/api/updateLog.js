export default{
  logList:[
    {
      version:'v1.1',
      logText:[
        '新增检测漏洞：跨域攻击、服务器端请求伪造、回车换行注入、Content-Security-Policy配置不当、CSRF、响应头中Server字段泄露服务器信息、响应头中Powered-By字段泄露开发语言信息、不安全的HTTP方法、HSTS响应头缺失、url中存在用户标识信息。',
        '优化检测漏洞：命令执行、SSRF、优化漏洞详情描述。'
      ],
      updateTime:'2020/04/23'
    },
    {
      version:'v1.0',
      logText:[
        '支持的功能：应用安全测试总体视图、应用信息查询、任务列表、请求列表、漏洞列表以及帮助功能。',
        '支持检测的漏洞：帐号越权、本地文件包含、XXE、XML炸弹、跨站脚本、文件上传漏洞、敏感信息泄露、错误信息泄露、SQL注入、xpath注入、命令执行、缺少HTTPONLY属性。'
      ],
      updateTime:'2020/01/02'
    }
  ]
}
