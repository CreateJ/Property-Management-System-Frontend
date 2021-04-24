import { Col, Row } from 'antd';
import React from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import { connect } from 'umi';
import { Column } from '@ant-design/charts';

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 24,
  style: {
    marginBottom: 24,
  },
};

const SkillsData = ({ skillsOrderNum }) => {
  const config = {
    data: skillsOrderNum,
    isGroup: true,
    xField: 'type',
    yField: 'num',
    seriesField: 'name',
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
  };

  return (
    <Row gutter={24} type="flex">
      <Col {...topColResponsiveProps}>
        <StatisticCard title="过去30天各类型工单数据图" chart={<Column {...config}></Column>} />
      </Col>
    </Row>
  );
};

export default connect()(SkillsData);
