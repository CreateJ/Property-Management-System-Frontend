import { PageContainer } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { useEffect } from 'react';

const MonthlyDataPanel = (props) => {
  useEffect(()=>{
    const { dispatch } = props;
    dispatch({ type:'monthlyDataPanelModel/fetch' })
  },[])

  const initData = () =>{
    const { dispatch } = props;
    dispatch({ type:'monthlyDataPanelModel/fetch' })
  }

  return (
    <PageContainer>
      <button onClick={initData}>123</button>
      <div>
        {props.monthlyDataPanelModel.visitData.map(item=> {
          return (<div key={item.x}>{item.x}</div>)
        })}
      </div>
      <h1>This is MonthlyDataPanel!</h1>
    </PageContainer>
  );
};

export default connect(({ monthlyDataPanelModel }) => ({
  monthlyDataPanelModel
}))(MonthlyDataPanel);
