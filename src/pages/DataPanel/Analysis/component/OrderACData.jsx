import { Col, Row } from 'antd';
import React from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import { connect } from 'umi';
import { Line } from '@ant-design/charts';

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

const OrderACData = ({ acData }) => {
  const config = {
    data: acData,
    xField: 'date',
    yField: 'order_num',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => {
            return ''.concat(s, ',');
          });
        },
      },
    },
    color: ['#1979C9', '#D62A0D'],
  };

  return (
    <Row gutter={24} type="flex">
      <Col {...topColResponsiveProps}>
        <StatisticCard
          title="七天工单接收数量和完成数量对比图"
          // style={{ width: '500px' }}
          chart={<Line {...config} />}
        />
      </Col>
    </Row>
  );
};

export default connect()(OrderACData);
