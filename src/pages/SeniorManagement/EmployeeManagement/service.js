import request from '@/utils/request';

export async function getEmployeeData(params){
  console.log(params,'请求参数');
  return request('/management/user',{
    params
  })
}

export async function employeeRegister(params){
  console.log(params,'请求参数');
  return request('/user/register',{
    method: 'POST',
    data: {...params}
  })
}

export async function deleteEmployee(id){
  return request(`/management/user/delete/${id}`,{
    method: 'DELETE',
  })
}
