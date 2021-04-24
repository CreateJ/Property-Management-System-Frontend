export const acDataTransToFrontend = (tmp) => {
  const keys = Object.keys(tmp);
  const values = Object.values(tmp);
  const resultArray = [];
  for (let i = 0; i < keys.length && i < values.length; i += 1) {
    resultArray.push({ name: '接收', date: keys[i], order_num: values[i].accept });
    resultArray.push({ name: '完成', date: keys[i], order_num: values[i].complete });
  }
  return resultArray;
};

const OrderType = ['', '水工', '电工', '木工', '设备', '土建', '邻里调解', '其他'];
export const typeDataTransToFrontend = (tmp) => {
  console.log(tmp);
  const resultArray = [];
  const { employee, order, non_timely } = tmp;
  for (let i = 0; i < employee.length; i += 1) {
    resultArray.push({
      name: '员工对应技能',
      type: OrderType[parseInt(employee[i].type, 10)],
      num: employee[i].num,
    });
    resultArray.push({
      name: '所有订单数',
      type: OrderType[parseInt(order[i].type, 10)],
      num: order[i].num,
    });
    resultArray.push({
      name: '不及时订单数',
      type: OrderType[parseInt(non_timely[i].type, 10)],
      num: non_timely[i].num,
    });
  }
  console.log('工单类型情况统计数据', resultArray);
  return resultArray;
};
