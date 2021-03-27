import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { getHouseholdData } from '@/pages/BasicManagement/HouseholdsManagement/services';
import { Drawer } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';

const HouseholdsManagement = (props) => {

  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState({});
  const [householdInfoVisible, setHouseholdInfoVisible] = useState(false);
  const intl = useIntl();
  useEffect(() => {
    getHouseholdData().then(res => {
      console.log(res);
    });
  }, []);

  const clickHouseholdName = (entity) => {
    setCurrentRow(entity);
    setHouseholdInfoVisible(true);
  };

  // 员工表 列数据
  const householdColumns = [
    {
      title: (
        <FormattedMessage
          id='pages.household.searchTable.householdId'
          defaultMessage='住户号'
        />
      ),
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id='pages.household.searchTable.householdName'
          defaultMessage='姓名'
        />
      ),
      dataIndex: 'name',
      valueType: 'textarea',
      render: (dom, entity) => {
        return (
          <a onClick={() => {
            clickHouseholdName(entity);
          }}>{dom}</a>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id='pages.household.searchTable.householdIdCode'
          defaultMessage='身份证'
        />
      ),
      dataIndex: 'id_code',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id='pages.household.searchTable.householdBirthday'
          defaultMessage='生日'
        />
      ),
      dataIndex: 'birthday',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id='pages.household.searchTable.householdSex'
          defaultMessage='性别'
        />
      ),
      dataIndex: 'sex',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id='pages.household.searchTable.handler'
          defaultMessage='操作'
        />
      ),
      render: (_, entity) => {
        return (<>
          <a onClick={() => {
            console.log(entity);
          }}>修改</a>&nbsp;&nbsp;
          <a onClick={() => {
            console.log('handler delete');
          }}>删除</a>
        </>);
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.household.searchTable.title',
          defaultMessage: '查询表格',
        })}
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        request={(params, sorter, filter) => getHouseholdData({ ...params, sorter, filter })}
        columns={householdColumns}
        rowKey='id'
        rowSelection={{}}
      >
      </ProTable>

      <Drawer
        width={600}
        visible={householdInfoVisible}
        onClose={() => {
          setCurrentRow(undefined);
          setHouseholdInfoVisible(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={householdColumns}
          />
        )}
      </Drawer>
    </PageContainer>
  )
}

export default HouseholdsManagement;
