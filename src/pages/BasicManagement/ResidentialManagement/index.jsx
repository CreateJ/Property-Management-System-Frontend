import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { getResidentialData } from '@/pages/BasicManagement/ResidentialManagement/services';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Drawer } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';

const ResidentialManagement = () => {
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState({});
  const [residentialVisible, setResidentialVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const intl = useIntl();
  useEffect(() => {
    getResidentialData().then(res => {
      console.log(res);
    });
  }, []);

  const clickResidentialName = (entity, dom) => {
    console.log(entity);
    setCurrentRow(entity);
    setResidentialVisible(true);
  };

  const transformDom = (entity) => {
    const tmp = entity.house_id.toString().split("")
    // console.log(entity.household_id);
    return `${tmp[0]}单元${tmp[1] + tmp[2]}栋${tmp[3] + tmp[4] + tmp[5]}号`
  }


  // 员工表 列数据
  const householdColumns = [
    {
      title: (
        <FormattedMessage
          id='pages.residential.searchTable.residentialId'
          defaultMessage='住宅号'
        />
      ),
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id='pages.residential.searchTable.householdNameId'
          defaultMessage='住宅名'
        />
      ),
      dataIndex: 'house_id',
      valueType: 'textarea',
      render: (dom, entity) => {
        return (
          // <a onClick={() => {
          //   clickResidentialName(entity, dom);
          // }}>{dom}</a>
        <a onClick={() => {
            clickResidentialName(entity, dom);
          }}
        >{transformDom(entity)}</a>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id='pages.residential.searchTable.householdId'
          defaultMessage='房主号'
        />
      ),
      dataIndex: 'household_id',
      valueType: 'textarea',

    },
    {
      title: (
        <FormattedMessage
          id='pages.residential.searchTable.handler'
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
          id: 'pages.residential.searchTable.title',
          defaultMessage: '查询表格',
        })}
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        request={(params, sorter, filter) => getResidentialData({ ...params, sorter, filter })}
        columns={householdColumns}
        rowKey='id'
        rowSelection={{}}
        toolBarRender={() => [
          <Button
            type='primary'
            key='primary'
            onClick={() => {
              setAddModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id='pages.searchTable.new' defaultMessage='新建' />
          </Button>,
        ]}
      >
      </ProTable>


      <ModalForm
        title={intl.formatMessage({
          id: 'pages.residential.searchTable.createFrom.newResidential',
          defaultMessage: '新建住宅',
        })}
        width='400px'
        visible={addModalVisible}
        onVisibleChange={setAddModalVisible}
        onFinish={async (value) => {
          // const success = await handleAdd(value);
          console.log(value,'residential page');
          if (true) {
            setAddModalVisible(false);
            if (actionRef.current) {
              // 自动触发组件自带的reload方法，发送query请求
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id='pages.residential.searchTable.householdNameId'
                  defaultMessage='住宅名为必填项'
                />
              ),
            },
          ]}
          width='md'
          name='house_id'
          label='住宅名'
          tips="直接填写单元号，栋号，房号即可，示例212301"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id='pages.residential.searchTable.householdNameId'
                  defaultMessage='住宅名为必填项'
                />
              ),
            },
          ]}
          width='md'
          name='household_id'
          label='住户号'
        />
      </ModalForm>


      {/*侧边栏抽屉组件*/}
      <Drawer
        width={600}
        visible={residentialVisible}
        onClose={() => {
          setCurrentRow(undefined);
          setResidentialVisible(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions
            column={2}
            title={currentRow?.house_id}
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
  );
};
export default ResidentialManagement;
