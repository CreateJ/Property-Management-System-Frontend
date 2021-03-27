import Mock from 'mockjs'

const getHouseholdData = (req, res) => {
  const data = Mock.mock({
    'householdInfo|20': [
      {
        'id|+1': 10001,
        'name': '@cname',
        'sex|1': ['男', '女'],
        'birthday': '@date("yyyy-MM-dd")',
        'id_code': '@guid',
        'phone|13000000000-14000000000': 13000000000,
        'num|1-10':1,
        'password|1': ['123456', 'admin123'],
        'email': '@email',
      }],
  })
  const result = {
    current: 1,
    data: data.householdInfo,
    pageSize: '20',
    success: true,
    total: data.householdInfo.length,
  };
  res.json(result);
}
export default {
  'GET /api/get_household_data': getHouseholdData,
};
