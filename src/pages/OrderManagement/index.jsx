import { PageContainer } from '@ant-design/pro-layout';
import { FormattedMessage, useIntl } from 'umi';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Cascader, Drawer, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';



import { createOrder, deleteOrder, getOrderData, modifyOrder } from './services';
import ProForm, { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { getSubType, serverType } from './map/serverType';
import ProDescriptions from '@ant-design/pro-descriptions';

const OrderManagement = (props) => {
  const intl = useIntl();
  const actionRef = useRef();
  const modifyRef = useRef();
  const [orderInfoVisible, setOrderInfoVisible] = useState(false)
  const [createVisible, setCreateVisible] = useState(false)
  const [modifyVisible, setModifyVisible] = useState(false)
  const [currentRow, setCurrentRow] = useState({})
  const [subServerOption, setSubServerOption] = useState([])

  const createModalOnFinish = async (value) => {
    let params = {
      type: value.subServer.slice(1),
      emergency: parseInt(value.emergency),
      house_id: parseInt(value.house_name),
      note: value.note,
    }
    const success = await createOrder(params)
    console.log(success);
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
    const success = await getOrderData(queryParams);
    if(success.code === 200){
      const newRes = {
        current: queryParams.page,
        pageSize: queryParams.page_size+"",
        data: success.data.orders,
        total: success.data.total
      }
      console.log(newRes, 'newRes');
      return newRes
    }else {
      message.error('添加失败请重试！');
      return {}
    }
  }


  // 更换级联选择的服务子类数据
  const formValuesChange = (values) =>{
    if(values.server){
      setSubServerOption(getSubType(values.server));
    }
  }

  const clickOrderId = (entity) => {
    setCurrentRow(entity)
    setOrderInfoVisible(true)
  }

  const handleModify = (order) => {
    console.log(order);
    const _order = JSON.parse(JSON.stringify(order))
    modifyRef.current.setFieldsValue(_order);
    setCurrentRow(order)
    setModifyVisible(true);
  }

  const handleDelete = async (order) => {
    const success = await deleteOrder(order.id);
    console.log(success,'handleDelete');
    if(actionRef){
      actionRef.current.reload();
    }
  }

  const modifyOnFinish = async (values) => {
    console.log(values);
    const params = {
      id: currentRow.id,
      stage: parseInt(values.stage),
      note: values.note
    }
    console.log(params);
    const success = await modifyOrder(params)
    console.log(success);
    if(success.code === 200){
      message.success('更新工单阶段成功',2)
    }else {
      message.success('更新工单阶段失败',2)
    }
    setModifyVisible(false)
    if(actionRef){
      actionRef.current.reload();
    }
  }


  const orderColumns = [
    {
      title: '服务工单号',
      dataIndex: 'id',
      valueType: 'textarea',
      render: (dom, entity) => {
        return (
          <a onClick={()=>{clickOrderId(entity)}}>{dom}</a>
        )
      }
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
      valueType: 'textarea',
      renderText: val => `${val==1?'不紧急':'紧急'}`
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
          <a onClick={() => {
            handleDelete(entity)
          }}>删除</a>
        </>);
      },
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
        request={(params,sorter,filter) => queryData(params, sorter, filter)}
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
        onChange={(value)=>{
          console.log(value);}}
      >
      </ProTable>

      {/*添加工单模态框*/}
      <ModalForm
        title={'新建工单'}
        width='500px'
        visible={createVisible}
        onVisibleChange={setCreateVisible}
        onFinish={async (value) => {
          // 这里发送请求
          await createModalOnFinish(value)
        }}
        onValuesChange={(cv => {
          formValuesChange(cv)})}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '姓名为必填项'
            },
          ]}
          width='md'
          name='house_name'
          label='住宅名'
        />
        <ProForm.Group>
          <ProFormSelect
            rules={[
              {
                required: true,
                message: '服务大类为必填项'
              },
            ]}
            label='服务大类'
            name='server'
            options={serverType}
          >


          </ProFormSelect>
          <ProFormSelect
            rules={[
              {
                required: true,
                message: '服务子类为必填项'
              },
            ]}
            name='subServer'
            label='服务子类'
            options={subServerOption}
          >
          </ProFormSelect>
          <ProFormSelect
            rules={[
              {
                required: true,
                message: '紧急程度为必填项'
              },
            ]}
            name='emergency'
            label='紧急程度'
            options={[
              {
                label: '不紧急',
                value: '2'
              },
              {
              label: '紧急',
              value: '1'
            }]}
          >
          </ProFormSelect>
        </ProForm.Group>
        <ProFormTextArea
          rules={[
            {
              required: true,
              message: '备注为必填项'
            },
          ]}
          placeholder='请在这里填写您方便的服务时间，请尽量填写正常工作时间的时间段'
          width='md'
          name='note'
          label='备注'
          reszie={false}
        >
        </ProFormTextArea>
      </ModalForm>


      {/*修改工单模态框*/}
      <ModalForm
        formRef={modifyRef}
        title={'修改工单'}
        width='500px'
        visible={modifyVisible}
        onVisibleChange={setModifyVisible}
        onFinish={async (value) => {
          // 这里发送请求
          await modifyOnFinish(value);
        }}
        onValuesChange={(cv => {
          formValuesChange(cv)})}
      >
        <ProFormSelect
          width='md'
          name='stage'
          label='阶段'
          options={
            [
              {
                value: '1',
                label: '已发布',
              },
              {
                value: '2',
                label: '已确认',
              },
              {
                value: '3',
                label: '进行中',
              },
              {
                value: '4',
                label: '暂停中',
              },
              {
                value: '5',
                label: '已终止',
              },
              {
                value: '6',
                label: '已完成',
              },
              {
                value: '7',
                label: '已评价',
              },
            ]
          }
        />
        <ProFormTextArea
          rules={[
            {
              required: true,
              message: '备注为必填项'
            },
          ]}
          placeholder='请在这里填写您方便的服务时间，请尽量填写正常工作时间的时间段'
          width='md'
          name='note'
          label='备注'
          reszie={false}
        >
        </ProFormTextArea>
      </ModalForm>



      {/*详情信息面板*/}
      <Drawer
        width={600}
        visible={orderInfoVisible}
        onClose={() => {
          setCurrentRow(undefined)
          setOrderInfoVisible(false);
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
            columns={orderColumns}
          />
        )}
      </Drawer>
    </PageContainer>
  )
}
export default OrderManagement;
