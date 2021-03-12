import request from 'umi-request'
export async function getOrderData(){
  return request('/api/get_order_data')
}
