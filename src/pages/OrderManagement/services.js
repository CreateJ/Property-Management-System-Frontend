import request from 'umi-request'

export async function getOrderData(params){
  console.log(params,'请求参数');
  return request('/api/get_order_data',{params})
}
