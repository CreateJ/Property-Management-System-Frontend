import { Col, Row, Tooltip } from 'antd';
import React from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import { connect } from 'umi';
import { Column } from '@ant-design/charts';


const { Statistic } = StatisticCard;

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

const OrderACData= ({ acData }) => {
  const config = {
    data: acData,
    isGroup: true,
    xField: 'date',
    yField: 'order_num',
    seriesField: 'name',
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
  }

  return (
    <Row gutter={24} type='flex'>
      <Col {...topColResponsiveProps}>
        <StatisticCard
          title="七天工单接收数量和完成数量对比图"
          // style={{ width: '500px' }}
          chart={
            <Column {...config}></Column>
          }
        />
      </Col>
    </Row>
  )
}

export default connect()(OrderACData)
