import React, { useState } from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import { Col, Row } from 'antd';
import { RingProgress } from '@ant-design/charts';

const { Statistic, Divider } = StatisticCard;

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

export default (props) => {
  const [responsive, setResponsive] = useState(false);
  const { order, good, timely } = props;

  const onlineConfig = {
    height: 100,
    width: 100,
    autoFit: false,
    percent: good / order,
    color: ['#5B8FF9', '#E8EDF3'],
  };

  const outlineConfig = {
    height: 100,
    width: 100,
    autoFit: false,
    percent: timely / order,
    color: ['#62DAAB', '#E8EDF3'],
  };

  return (
    <Row>
      <Col {...topColResponsiveProps}>
        <RcResizeObserver
          key="resize-observer"
          onResize={(offset) => {
            setResponsive(offset.width < 640);
          }}
        >
          <StatisticCard.Group direction={responsive ? 'column' : undefined}>
            <StatisticCard
              statistic={{
                title: '过去30天工单总数',
                value: order,
              }}
            />
            <Divider type={responsive ? 'horizontal' : 'vertical'} />
            <StatisticCard
              statistic={{
                title: '好评率',
                value: good,
                description: (
                  <Statistic title="占比" value={`${((good / order) * 100).toFixed(2)}%`} />
                ),
              }}
              chart={<RingProgress {...onlineConfig}></RingProgress>}
              chartPlacement="left"
            />
            <StatisticCard
              statistic={{
                title: '及时率',
                value: timely,
                description: (
                  <Statistic title="占比" value={`${((timely / order) * 100).toFixed(2)}%`} />
                ),
              }}
              chart={<RingProgress {...outlineConfig}></RingProgress>}
              chartPlacement="left"
            />
          </StatisticCard.Group>
        </RcResizeObserver>
      </Col>
    </Row>
  );
};
