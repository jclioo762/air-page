import instance from './interceptor'

/**
 * 核心函数，可通过它处理一切请求数据，并做横向扩展
 * @param {url} 请求地址
 * @param {params} 请求参数
 * @param {options} 请求配置，针对当前本次请求；
 * @param error 本次是否显示错误
 */
function request(url, params, options = {
    loading:true,
    error:true
    }, method) {
    return new Promise((resolve,reject)=>{
        let data = {}
        // get，delete 请求使用params字段
        if(method ==='get' || method ==='delete') data = { params }
        // post，put 请求使用data字段
        if(method ==='post' || method ==='put') data = { data: params }
        instance({
            url,
            method,
            ...data
        }).then((res)=>{
            //扩展功能
            if(res.status === 200){
                resolve(res.data);
            }else{
                if(options.error) alert(res.message);
                reject(res);
            }
        }).catch((error)=>{
            alert(error.message)
        }).finally(()=>{
            // 释放资源
        })
    })
}

// 封装GET请求
export const get = (url,params,options) => {
    return request(url,params,options,'get')
}
// 封装POST请求
export const post = (url,params,options) => {
    return request(url,params,options,'post')
}
// 封装DELETE请求
export const del = (url,params,options) => {
    return request(url,params,options,'delete')
}
// 封装PUT请求
export const put = (url,params,options) => {
    return request(url,params,options,'put')
}