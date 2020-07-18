import axios from 'axios'

export function request(config) {
  //创建实例
  const instance = axios.create({
    //具体接口需要添加why老师微信
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  });
  //axios拦截器
  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    console.log(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  //发送真正的网络请求
  return instance(config)
}
