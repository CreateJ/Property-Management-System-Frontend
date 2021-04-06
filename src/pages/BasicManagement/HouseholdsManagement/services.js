import request2 from '@/utils/requestMock'
import request from '@/utils/request';

export async function getHouseholdData(params){
  console.log(params,'Mock请求参数');
  return request2('/api2/get_household_data',{
    params
  })
}



export async function householdRegister(params){
  console.log(params,'请求参数');
  return request('/user/register',{
    method: 'POST',
    data: {...params}
  })
}

export async function queryHouseholdData(params){
  return request('/management/user',{
    method: 'GET',
    params
  })
}

export async function deleteHousehold(id){
  return request(`/management/user/delete/${id}`,{
    method: 'DELETE',
  })
}
export async function modifyHousehold(params){
  return request(`/management/user`,{
    method: 'PUT',
    data: params
  })
}


