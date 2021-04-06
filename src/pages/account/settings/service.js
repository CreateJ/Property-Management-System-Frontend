import request1 from 'umi-request';
import request from '@/utils/request'

export async function queryCurrent() {
  return request1('/api/currentUser');
}
export async function queryProvince() {
  return request1('/api/geographic/province');
}
export async function queryCity(province) {
  return request1(`/api/geographic/city/${province}`);
}
export async function query() {
  return request1('/api/users');
}


export const changePassWord = (params) => {
  return request('/user/personal',{
    method: 'POST',
    data: params,
  })
}
