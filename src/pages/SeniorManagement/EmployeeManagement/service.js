import request from '@/utils/request'

export async function getEmployeeData(params){
  console.log(params,'请求参数');
  return request('/api/get_employee_data',{
    params
  })
}
