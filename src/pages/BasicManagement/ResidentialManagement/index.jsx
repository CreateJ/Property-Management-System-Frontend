import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import {
  getResidentialData,
  createResidential,
  registerResidential,
  deleteHouse, modifyHouseInfo,
} from '@/pages/BasicManagement/ResidentialManagement/services';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Drawer, message } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';

const ResidentialManagement = () => {
  const addFormRef = useRef()
  const actionRef = useRef();
  const regFormRef = useRef();
  const modifyRef = useRef();
  const [currentRow, setCurrentRow] = useState({});
  const [residentialVisible, setResidentialVisible] = useState(false);

  // 控制新建住宅模态框
  const [addModalVisible, setAddModalVisible] = useState(false);
  // 控制用户注册入住模态框
  const [registerVisible, setRegisterVisible] = useState(false);
  // 控制修改住宅
  const [modifyVisible, setModifyVisible] = useState(false)
  const intl = useIntl();

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

  const queryData = async (params, _s, _f) => {
    const queryParams = {
      page:params.current,
      page_size:params.pageSize,
      ...params
    };
    delete queryParams.current;
    delete queryParams.pageSize;
    console.log(queryParams, '多条件查询参数');
    const success = await getResidentialData({ ...queryParams })
    console.log(success);
    if(success.code === 200){
      const newRes = {
        current: queryParams.page,
        pageSize: queryParams.page_size+"",
        data: success.data.houses,
        total: success.data.total
      }
      console.log(newRes, 'newRes');
      return newRes
    }else {
      message.error('添加失败请重试！');
      return {}
    }
  }

  const createModalFinish = async (value) => {
    const success = await createResidential(value);
    console.log(success);

    if (success && success.code === 200) {
      setAddModalVisible(false);
      if (actionRef.current) {
        // 自动触发组件自带的reload方法，发送query请求
        actionRef.current.reload();
      }
    }
    console.log(addFormRef,'ref');
    // addFormRef.current.resetFields();
  }

  const registerModalFinish = async (value) => {
    console.log(value);
    value.household_id = parseInt(value.household_id)
    const success = await registerResidential(value);
    console.log(success);

    if (success && success.code === 200) {
      setRegisterVisible(false);
      regFormRef.current.resetFields();
      if (actionRef.current) {
        // 自动触发组件自带的reload方法，发送query请求
        actionRef.current.reload();
      }
    }
  }

  const handleModify = (house) => {
    console.log(house);
    const _house = JSON.parse(JSON.stringify(house))
    modifyRef.current.setFieldsValue(_house);
    setModifyVisible(true);
  }

  const handleDelete = async (house) => {
    const success = await deleteHouse(house.house_id);
    if (success && success.code === 200) {
      message.success('删除成功！',1)
      if (actionRef.current) {
        // 自动触发组件自带的reload方法，
        const {current:{reload}}=actionRef
        reload()
        // actionRef.current.reload();
      }
    }
  }

  const modifyOnFinish = async (values) => {
    console.log(values);
    const success = await modifyHouseInfo({
      house_id: values.house_id,
      household_id: parseInt(values.household_id),
    })
    if(success.code === 200){
      message.success('修改成功',2)
    }else {
      message.success('修改失败，请检查重试',2)
    }
    setModifyVisible(false)
    if(actionRef){
      actionRef.current.reload();
    }
  }



  // 住宅表 列数据
  const householdColumns = [
    {
      title: '住宅号',
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: '住宅名',
      dataIndex: 'house_id',
      valueType: 'textarea',
      render: (dom, entity) => {
        return (
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
          defaultMessage='户主号'
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
            handleModify(entity)
          }}>修改</a>&nbsp;&nbsp;
          <a onClick={async () => {
            await handleDelete(entity)
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
        request={(params, sorter, filter) => queryData(params, sorter, filter)}
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
          <Button
            type='primary'
            key='primary'
            onClick={() => {
              setRegisterVisible(true);
            }}
          >
            <PlusOutlined /> 入住
          </Button>,
        ]}
      >
      </ProTable>


      {/*新建住宅模态框*/}
      <ModalForm
        formRef={addFormRef}
        title='新建住宅'
        width='400px'
        visible={addModalVisible}
        onVisibleChange={setAddModalVisible}
        onFinish={async (value) => {
          await createModalFinish(value)
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
      </ModalForm>

      {/*住户注册入住*/}
      <ModalForm
        formRef={regFormRef}
        title='住户注册入住'
        width='400px'
        visible={registerVisible}
        onVisibleChange={setRegisterVisible}
        onFinish={async (value) => {
          await registerModalFinish(value)
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

      {/*住宅关联信息修改*/}
      <ModalForm
        formRef={modifyRef}
        title='修改住宅信息'
        width='400px'
        visible={modifyVisible}
        onVisibleChange={setModifyVisible}
        onFinish={async (value) => {
          await modifyOnFinish(value)
        }}
      >
        <ProFormText
          width='md'
          name='house_id'
          label='住宅名'
          readonly
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
