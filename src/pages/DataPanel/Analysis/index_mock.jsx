import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'umi';
import React, { useEffect, Suspense, useState } from 'react';
import PageLoading from './component/PageLoading';
import OrderEasyData from './component/OrderEasyData';
import OrderACData from './component/OrderACData';
import { acData, skillsOrderNum } from './mockData';
import SkillsData from './component/SkillsData';

const Analysis = (props) => {
  const [easyData, setEasyData] = useState({});
  useEffect(() => {
    // 在这里初始化数据
    console.log(props.analysis);
    setEasyData({});
  }, []);
  return (
    <GridContent>
      <React.Fragment>
        <Suspense fallback={<PageLoading />}>
          <OrderEasyData easyData={easyData}></OrderEasyData>
          <OrderACData acData={acData}></OrderACData>
          <SkillsData skillsOrderNum={skillsOrderNum}></SkillsData>
        </Suspense>
      </React.Fragment>
    </GridContent>
  );
};

export default connect(({ analysis }) => ({
  analysis,
}))(Analysis);
