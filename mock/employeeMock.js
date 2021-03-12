import Mock from 'mockjs'
const getEmployeeData = (req, res) => {
  const employeeData = Mock.mock({ 'userInfo|20': [
    {
      'empId|+1': 101,
      'empName':'@cname',
      'empIdCode':'@id',
      'empSex|1': ['男','女'],
      'empAge|20-50': 50,
      'empWechatId':'@guid',
      'empLevel|1': ['1','2','3','4','5'],
    }]});
  const result = {
    current: 1,
    data: employeeData.userInfo,
    pageSize: '20',
    success: true,
    total: employeeData.userInfo.length
  }
  res.json(result)
}

export default {
  'GET /api/get_employee_data': getEmployeeData
}
