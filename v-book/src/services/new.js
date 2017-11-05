import { get, post } from '../utils/request';
/**
 * 保存数据到服务器
 * @export
 * @param {object} data 需要提交保存的数据
 * @returns Promise
 */
export function save(data){
  return post('/api/v1/new/create',data)
}

export function login(data) {
  return post('/api/v1/new/login',data)
}

export function update(name,data) {
  return post(`/api/v1/new/update/${name}`,data)
}

export function getBook(name){
  return get(`/api/v1/new/book/${name}`)
}

export function delBook(data){
  return post('/api/v1/new/delbook',data)
}
