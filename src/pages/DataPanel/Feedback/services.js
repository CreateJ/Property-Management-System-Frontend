import request from '@/utils/request';

export const getFeedBack = async (params) => {
  return request('/management/feedback', {
    method: 'GET',
    params,
  });
};
