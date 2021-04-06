import Mock from 'mockjs';

const getEmployeeData = (req, res) => {
  const employeeData = Mock.mock({
    'userInfo|20': [
      {
        'id|+1': 10001,
        'name': '@cname',
        'id_code': '@guid',
        'sex|1': ['男', '女'],
        'birthday': '@date("yyyy-MM-dd")',
        'phone|13000000000-14000000000': 13000000000,
        'wechat|+1': 10000001,
        'email': '@email',
        'level|100000-999999': 999999,
        'state|1': ['0', '1'],
        'super_state|1': ['0', '1'],
        'skills|1': [0, 1, 2, 3, 4, 5, 6],
        'password|1': ['123456', 'admin123'],
      }],
  });
  const result = {
    current: 1,
    data: employeeData.userInfo,
    pageSize: '20',
    success: true,
    total: employeeData.userInfo.length,
  };
  res.json(result);
};

export default {
  'GET /api2/get_employee_data': getEmployeeData,
};
