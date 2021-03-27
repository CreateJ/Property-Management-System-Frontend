import request from '@/utils/request'

export async function getHouseholdData(params){
  console.log(params,'请求参数');
  return request('/api/get_household_data',{
    params
  })
}
