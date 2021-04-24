import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'umi';
import React, { useEffect, Suspense, useState } from 'react';
import PageLoading from './component/PageLoading';
import OrderACData from './component/OrderACData';
import SkillsData from './component/SkillsData';
import {
  acDataTransToFrontend,
  typeDataTransToFrontend,
} from '@/pages/DataPanel/Analysis/utils/dataTransUtil';
import {
  getAcData,
  getEmployeeState,
  getMonthOrderData,
  getMouthTypeData,
} from '@/pages/DataPanel/Analysis/services';
import EmployeeNumData from '@/pages/DataPanel/Analysis/component/EmployeeNumData';
import OrderStateData from '@/pages/DataPanel/Analysis/component/OrderStateData';

const Analysis = () => {
  const [acData, setAcData] = useState([]);
  const [orderData, setOrderData] = useState({ order: 100, good: 90, timely: 10 });
  const [employeeNum, setEmployeeNum] = useState({ all: 100, online: 80, outline: 20 });
  const [typeData, setTypeData] = useState([]);
  useEffect(() => {
    // 初始化七天工单接收完成情况状态
    getAcData().then((res) => {
      if (res.code === 200) {
        setAcData(acDataTransToFrontend(res.data));
      }
    });

    // 初始化员工状态
    getEmployeeState().then((res) => {
      if (res.code === 200) {
        setEmployeeNum(res.data);
      }
    });

    // 初始化月工单类型数据
    getMouthTypeData().then((res) => {
      if (res.code === 200) {
        setTypeData(typeDataTransToFrontend(res.data));
      }
    });

    getMonthOrderData().then((res) => {
      if (res.code === 200) {
        setOrderData(res.data);
      }
    });
  }, []);
  return (
    <GridContent>
      <React.Fragment>
        <Suspense fallback={<PageLoading />}>
          <OrderStateData {...orderData} />
          <EmployeeNumData {...employeeNum} />
          <OrderACData acData={acData} />
          <SkillsData skillsOrderNum={typeData} />
        </Suspense>
      </React.Fragment>
    </GridContent>
  );
};

export default connect(({ analysis }) => ({
  analysis,
}))(Analysis);
