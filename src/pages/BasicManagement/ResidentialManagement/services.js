import request from '@/utils/request'

export async function getResidentialData(params){
  console.log(params,'请求参数');
  return request('/management/house',{
    params
  })
}

export async function createResidential(params){
  console.log(params,'请求参数');
  return request('/house/create',{
    method: 'POST',
    data: {...params}
  })
}

export async function registerResidential(params){
  console.log(params,'请求参数');
  return request('/house/register',{
    method: 'POST',
    data: {...params}
  })
}

export async function deleteHouse(params){
  return request(`/management/house/delete/${params}`,{
    method: 'DELETE'
  })
}

export async function modifyHouseInfo(params){
  console.log(params);
  return request('/management/house', {
    method: 'PUT',
    data: {...params}
  })
}
