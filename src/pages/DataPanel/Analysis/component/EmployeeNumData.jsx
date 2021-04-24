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
  const { all, online, outline } = props;

  const onlineConfig = {
    height: 100,
    width: 100,
    autoFit: false,
    percent: online / all,
    color: ['#5B8FF9', '#E8EDF3'],
  };

  const outlineConfig = {
    height: 100,
    width: 100,
    autoFit: false,
    percent: outline / all,
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
                title: '员工总数',
                value: all,
              }}
            />
            <Divider type={responsive ? 'horizontal' : 'vertical'} />
            <StatisticCard
              statistic={{
                title: '上班中',
                value: online,
                description: (
                  <Statistic title="占比" value={`${((online / all) * 100).toFixed(2)}%`} />
                ),
              }}
              chart={<RingProgress {...onlineConfig}></RingProgress>}
              chartPlacement="left"
            />
            <StatisticCard
              statistic={{
                title: '休息中',
                value: outline,
                description: (
                  <Statistic title="占比" value={`${((outline / all) * 100).toFixed(2)}%`} />
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
