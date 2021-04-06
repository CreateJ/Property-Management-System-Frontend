import Mock from 'mockjs';

const getResidentialData = (req, res) => {
  const data = Mock.mock({
    'residentialInfo|20': [
      {
        'id|+1': 10001,
        'household_id|+1': 10000,
        'house_id|100000-999999': 100000,//住宅名：304151（3单元第4栋15层1号）
      }],
  });
  const result = {
    current: 1,
    data: data.residentialInfo,
    pageSize: '20',
    success: true,
    total: data.residentialInfo.length,
  };
  res.json(result);
};

export default {
  'GET /api2/get_residential_data': getResidentialData,
};
