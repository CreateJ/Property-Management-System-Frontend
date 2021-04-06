import request2 from '@/utils/requestMock';

export async function getData(){
  return request2('/api2/get_faker_chart_data');
}
