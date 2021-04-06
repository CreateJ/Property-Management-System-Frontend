import request2 from '@/utils/requestMock';
import request from '@/utils/request';

export async function query() {
  return request2('/api2/users');
}
export async function queryCurrent() {
  return request2('/api2/currentUser');
}
export async function queryNotices() {
  return request2('/api2/notices');
}

export async function getUserData() {
  return request('/user/message');
}

export async function modifyPassword(params) {
  return request('/user/personal',{
    method: 'POST',
    data: params
  })
}

export async function modifyEmployee(params){
  return request(`/management/user`,{
    method: 'PUT',
    data: {...params}
  })
}


// 修改个人信息
export async function modifyUserInfo(params) {
  return request('/user/personal',{
    method: 'POST',
    data: params
  })
}

