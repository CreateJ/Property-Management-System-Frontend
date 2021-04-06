import request from '../../utils/request'

export async function getOrderData(params){
  console.log(params,'请求参数');
  return request('/management/order',{params})
}

export async function modifyOrder(params){
  const {id, stage, note} = params
  return request(`/order/${id}`, {
    method: 'POST',
    data: {
      stage,
      note
    }
  })
}

export function createOrder(params){
  return request('/order/create',{
    method: 'POST',
    data: params
  })
}

export function deleteOrder(params){
  return request(`/management/order/delete/${params}`,{
    method: 'DELETE',
  })
}
