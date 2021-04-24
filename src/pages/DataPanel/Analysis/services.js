import request from '@/utils/request';

export const getAcData = async () => {
  return request('/management/order/state');
};

export const getEmployeeState = async () => {
  return request('/management/employee/state');
};

export const getMouthTypeData = async () => {
  return request('/management/skills/state');
};

export const getMonthOrderData = async () => {
  return request('/management/month/order/state');
};
