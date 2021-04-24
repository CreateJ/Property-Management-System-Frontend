import request1 from 'umi-request';
import request from '@/utils/request';

export async function queryCurrent() {
  console.log('111111111111/api/currentUser');
  return request1('/api/currentUser');
}
export async function queryProvince() {
  console.log('111111111111/api/geographic/province');
  return request1('/api/geographic/province');
}
export async function queryCity(province) {
  console.log('111111111111', `/api/geographic/city/${province}`);
  return request1(`/api/geographic/city/${province}`);
}
export async function query() {
  console.log('111111111111/api/users');
  return request1('/api/users');
}

export const changePassWord = (params) => {
  return request('/user/personal', {
    method: 'POST',
    data: params,
  });
};
