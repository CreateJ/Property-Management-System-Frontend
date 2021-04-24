import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import styles from '@/pages/DataPanel/Feedback/feedback.less';
import { connect } from 'umi';
import { timeTransToFrontend } from '@/utils/transformUtils';

const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 24,
  xl: 24,
};

const FeedbackItem = (props) => {
  const { content, create_time } = props.item;
  const [name, setName] = useState('匿名用户');
  useEffect(() => {
    // 获取用户信息
    if (props.item.user_id) {
      setName(`用户${props.item.user_id}`);
    }
  }, []);
  return (
    <>
      <Col {...topColResponsiveProps}>
        <div className={styles.title}>{name}</div>
        <div className={styles.content}>{`${content}`}</div>
        <div className={styles.footer}>{timeTransToFrontend(create_time)}</div>
      </Col>
    </>
  );
};

export default connect()(FeedbackItem);
