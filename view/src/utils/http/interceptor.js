/**
 * 生成基础axios对象，并对请求和响应做处理
 * 前后端约定接口返回解构规范
 */
import axios from 'axios'
import qs from 'qs'

// 创建一个独立的axios实例
const service = axios.create({ 
    // 定义统一的请求头部
    // headers: {
    //    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    // },
    // 配置请求超时时间
    timeout: 20 * 1000,
});
// 请求拦截
service.interceptors.request.use(config => {
    config.data = qs.stringify(config.data);
    //   //判断localStorage是否存在token
    // if (localStorage.getItem('token')) {
    //     //携带token到axios参数
    //     config.headers.Authorization = '固定携带的头部';
    //     config.params = {
    //     //固定携带参数
    //     }
    // }
    return config;
}, error => {
    Promise.reject(error)
})
// 返回拦截
service.interceptors.response.use((response)=>{
    // 获取接口返回结果
    // const res = response.data;
    // // code为0，直接把结果返回回去，这样前端代码就不用在获取一次data.
    // if(res.code === 0){
    //     return res;
    // }else if(res.code === 10000){
    //     // 10000假设是未登录状态码
    //     // Message.warning(res.message);

    //     alert(res.message);

    //     // 也可使用router进行跳转
    //     window.location.href = '/#/login';
    //     return res;
    // }else{
    //     // 错误显示可在service中控制，因为某些场景我们不想要展示错误
    //     // Message.error(res.message);
    //     return res;
    // }
    return response
}, error => {
      /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
        alert('服务器响应超时，请刷新当前页')
    }
        error.message = '连接服务器失败'
    }
  alert(error.message);
  /***** 处理结束 *****/
  return Promise.resolve(error.response)
});
export default service;