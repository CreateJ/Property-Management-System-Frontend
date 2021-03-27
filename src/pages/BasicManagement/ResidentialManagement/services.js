import request from '@/utils/request'

export async function getResidentialData(params){
  console.log(params,'请求参数');
  return request('/api/get_residential_data',{
    params
  })
}
