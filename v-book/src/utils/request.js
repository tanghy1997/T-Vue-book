import axios from 'axios'
import {server} from './config'
/**
 * 向服务器端发送get请求
 * @param {string} url 请求的地址
 * @param {object} payload 配置参数
 * @param {boolean} [isLocal=true] 是否请求的是本地服务
 * @returns Promise
 */
export function get(url,payload,isLocal=true){
  if(isLocal){
    url = server + url;
  }
  return axios.get(url,payload)
}

/**
 * 发送post请求
 * @param {string} url  请求的地址
 * @param {object} data 传递的参数
 * @param {boolean} [isLocal=true]  是否是本地服务器
 * @returns Promise
 */
export function post(url,data,isLocal=true){
  if(isLocal){
    url = server + url
    console.log(url)
  }
  return axios.post(url,data)
}
