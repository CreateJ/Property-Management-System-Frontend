import Mock from 'mockjs';

const getOrderData = (req, res) => {
  const orderData = Mock.mock({
    'orderInfo|20': [
      {
        'id|+1': 100001,
        'household_id|+1': 10001,
        'household_name': '@cname',
        'house_id|+1': 10001,
        'employee_id|+1': 10001,
        'employee_name': '@cname',
        'type|1': [1,2,3,4,5,6,7],
        'emergency|1': ['否','是'],
        'stage|1': [1,2,3,4,5,6,7],
        'evaluation|+1': 1000001,
        'create_time|+1': 2000001,
        'update_time|+1': 3000001,
      }],
  });
  const result = {
    current: 1,
    data: orderData.orderInfo,
    pageSize: '20',
    success: true,
    total: orderData.orderInfo.length,
  };
  res.json(result);
};

export default {
  'GET /api/get_order_data': getOrderData,
};
