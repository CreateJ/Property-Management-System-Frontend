import { Col, Row, Tooltip } from 'antd';
import React from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import { connect } from 'umi';
import { Space } from 'antd';

const { Statistic } = StatisticCard;

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

const OrderEasyData = ({ easyData }) => {
  return (
    <Row gutter={24} type="flex">
      <Col {...topColResponsiveProps}>
        <StatisticCard
          bordered={false}
          title="过去30天好评率"
          statistic={{
            value: `80 %`,
            description: (
              <Space>
                <Statistic title=" " value=" " />
              </Space>
            ),
          }}
          footer={<Statistic value={83} title="昨日好评率" suffix="%" layout="horizontal" />}
        ></StatisticCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <StatisticCard
          bordered={false}
          title="过去30天任务及时完成率"
          statistic={{
            value: `65 %`,
            description: (
              <Space>
                <Statistic title=" " value=" " />
              </Space>
            ),
          }}
          footer={<Statistic value={83} title="昨日任务及时完成" suffix="%" layout="horizontal" />}
        ></StatisticCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <StatisticCard
          bordered={false}
          title="过去30天数据"
          statistic={{
            value: `80 %`,
            description: (
              <Space>
                <Statistic title=" " value=" " />
              </Space>
            ),
          }}
          footer={<Statistic value={83} title="昨日好评率" suffix="%" layout="horizontal" />}
        ></StatisticCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <StatisticCard
          bordered={false}
          title="过去30天好评率"
          statistic={{
            value: `80 %`,
            description: (
              <Space>
                <Statistic title=" " value=" " />
              </Space>
            ),
          }}
          footer={<Statistic value={83} title="昨日好评率" suffix="%" layout="horizontal" />}
        ></StatisticCard>
      </Col>
    </Row>
  );
};

export default connect()(OrderEasyData);
