/**
 * axios拦截器
 */
import axios from 'axios'
import store from '@/store'
// 判断开发模式
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = process.env.VUE_APP_URL;
}
else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = process.env.VUE_APP_URL;
}
else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = process.env.VUE_APP_URL;
}
// VueLocalStorage.get('someNumber')
// 全局设置头部信息
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.post['token'] = '123456789';

//设置的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

// 全局设置超时时间
axios.defaults.timeout = 3000;

// 请求拦截
axios.interceptors.request.use(function (config) {
  if (!config.url.includes('/cateringmanagement/addgoods/getgoodsbyname')) {
    store.commit('showLoading')
  }
  // 判断那些接口需要添加token，那些接口需要添加请求类型，判断token是否存在
  if (!(config.url.includes('/login'))) {
    config.headers.post['APPKEY'] = localStorage.getItem('APPKEY');
    config.headers.post['userId'] = localStorage.getItem('userCode');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 响应拦截
axios.interceptors.response.use(function (response){
  // 处理200响应数据错误
  if (response.status === 200) {
    store.commit('hideLoading')
    // 处理服务器本身错误
    if (response.data.code === '1000') {
      return Promise.resolve(response);
    } else if (response.data.code === '1005') {
      store.commit('remindChange',{show:true,code:response.data.code,msg:response.data.msg})
      return Promise.reject(response);
    }
    else {
      store.commit('remindChange',{show:true,code:response.data.code,msg:response.data.msg})
      return Promise.reject(response);
    }
  } else {
    store.commit('hideLoading')
    window.alert('链接服务器失败，请稍后重试！')
    return Promise.reject(response);
  }
},function (error){
  store.commit('hideLoading')
  // 请求超时处理
  if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
    const confirm = window.confirm('网络请求超时，请重试！')
    if (confirm) {
      location.reload()
      return Promise.resolve(error);
    } else {
      return Promise.reject(error); // 错误信息
    }
  }
  // 处理响应失败
  return Promise.reject(error);
});

// 封装get请求
export function get(url, params){
  return new Promise((resolve, reject) =>{
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err =>{
      reject(err.data)
    })
  });
}

// 封装post请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(err.data)
      })
  });
}
