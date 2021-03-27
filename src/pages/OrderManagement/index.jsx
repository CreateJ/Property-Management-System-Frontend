import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage, useIntl } from 'umi';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';


import { getOrderData } from './services';

const OrderManagement = (props) => {
  const intl = useIntl();
  const actionRef = useRef();
  const [orderInfoVisible, setOrderInfoVisible] = useState(false)
  const [createVisible, setCreateVisible] = useState(false)
  const [currentRow, setCurrentRow] = useState({})
  useEffect(()=>{
    getOrderData().then((res,req)=>{
      console.log(res);
    })
  },[])
  const orderColumns = [
    {
      title: '服务工单号',
      dataIndex: 'id',
      valueType: 'textarea'
    },
    {
      title: '住户号',
      dataIndex: 'household_id',
      valueType: 'textarea'
    },
    {
      title: '住户名',
      dataIndex: 'household_name',
      valueType: 'textarea'
    },
    {
      title: '住宅号',
      dataIndex: 'house_id',
      valueType: 'textarea'
    },
    {
      title: '员工号',
      dataIndex: 'employee_id',
      valueType: 'textarea'
    },
    {
      title: '员工名',
      dataIndex: 'employee_name',
      valueType: 'textarea'
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'textarea'
    },
    {
      title: '是否紧急',
      dataIndex: 'emergency',
      valueType: 'textarea'
    },
    {
      title: '阶段',
      dataIndex: 'stage',
      valueType: 'textarea'
    },
    {
      title: '评价等级',
      dataIndex: 'evaluation',
      valueType: 'textarea'
    },
  ]
  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.orderManagement.searchTable.title',
          defaultMessage: '查询表格'
        })}
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        request={(params,sorter,filter) => getOrderData({ ...params, sorter, filter })}
        columns={orderColumns}
        rowKey="id"
        rowSelection={{}}
        toolBarRender={() => [
          <Button
            type='primary'
            key='primary'
            onClick={() => {
              setCreateVisible(true);
            }}
          >
            <PlusOutlined />
            <FormattedMessage id='pages.searchTable.new' defaultMessage='新建' />
          </Button>,
        ]}
      >
      </ProTable>
    </PageContainer>
  )
}
export default OrderManagement;
