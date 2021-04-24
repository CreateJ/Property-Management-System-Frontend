import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { getFeedBack } from '@/pages/DataPanel/FeedBack/services';
import { Button, Row } from 'antd';
import styles from './feedback.less';
import FeedbackItem from './components/FeedbackItem';

const FeedBack = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  useEffect(() => {
    getFeedBack({ page: nowPage, page_size: 10 }).then((res) => {
      setFeedbacks(res.data.feedback);
    });
  }, []);

  const roadMore = async () => {
    console.log(feedbacks);
    getFeedBack({ page: nowPage + 1, page_size: 10 }).then((res) => {
      console.log(res);
      const feedbacksTmp = res.data.feedback;
      if (feedbacksTmp) {
        setFeedbacks(feedbacks.concat(feedbacksTmp));
      }
    });
    setNowPage(nowPage + 1);
  };

  return (
    <PageContainer>
      {feedbacks &&
        feedbacks.map((item) => {
          return (
            <Row className={styles.Row} key={item.id}>
              <FeedbackItem item={item} />
            </Row>
          );
        })}

      <div style={{ textAlign: 'center' }}>
        <Button
          onClick={async () => {
            await roadMore();
          }}
        >
          加载更多
        </Button>
      </div>
    </PageContainer>
  );
};

export default connect()(FeedBack);
