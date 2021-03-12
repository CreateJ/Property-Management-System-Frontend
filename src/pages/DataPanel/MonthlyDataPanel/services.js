import request from '@/utils/request';

export async function getData(){
  return request('/api/get_faker_chart_data');
}
