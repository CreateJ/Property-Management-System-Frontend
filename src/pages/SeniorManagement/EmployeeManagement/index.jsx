import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { useIntl, FormattedMessage } from 'umi';
import React, { useEffect, useRef, useState } from 'react';
import { getEmployeeData } from './service';
import { Button, Drawer } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProForm, { ModalForm, ProFormCheckbox, ProFormDatePicker, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

const EmployeeManagement = () => {

  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState({})
  const [employeeInfoVisible, setEmployeeInfoVisible] = useState(false)
  const [createEmployeeVisible, setCreateEmployeeVisible] = useState(false)
  const intl = useIntl();
  useEffect(()=>{
    // getEmployeeData().then(res=> {
    //   console.log(res);
    // })
  },[])

  const clickEmployeeName = (entity) => {
    setCurrentRow(entity);
    setEmployeeInfoVisible(true);
  }

  // 创建员工模态框点击提交触发的事件
  const createModalOnFinish = (value) => {
    const params = JSON.parse(JSON.stringify(value))
    const date = new Date(value.birthday)
    const dateTimeStamp = date.valueOf();
    let skills_tmp = value.skills[0];
    if(value.skills.length >= 2){
      for(let i = 1; i < value.skills.length; i++){
        skills_tmp+=('|' + value.skills[i])
      }
    }
    params.skills = skills_tmp;
    params.birthday = dateTimeStamp;
    params.user_type = '1';
    console.log(params);
    // const success = await handleAdd(value);
    if (true) {
      setCreateEmployeeVisible(false);
      if (actionRef.current) {
        // 自动触发组件自带的reload方法，发送query请求
        actionRef.current.reload();
      }
    }
  }

  // 员工表 列数据
  const employeeColumns = [
    {
      title: (
        <FormattedMessage
          id='pages.employee.searchTable.employeeId'
          defaultMessage='工号'
        />
      ),
      dataIndex: 'id',
      valueType: 'textarea'
    },
    {
      title: (
        <FormattedMessage
          id='pages.employee.searchTable.employeeName'
          defaultMessage='姓名'
        />
      ),
      dataIndex: 'name',
      valueType: 'textarea',
      render: (dom, entity) => {
        return (
          <a onClick={()=>{clickEmployeeName(entity)}}>{dom}</a>
        )
      }
    },
    {
      title: (
        <FormattedMessage
          id='pages.employee.searchTable.employeeIdCode'
          defaultMessage='姓名'
        />
      ),
      dataIndex: 'id_code',
      valueType: 'textarea'
    },
    {
      title: (
        <FormattedMessage
          id='pages.employee.searchTable.employeeBirthday'
          defaultMessage='生日'
        />
      ),
      dataIndex: 'birthday',
      valueType: 'textarea'
    },
    {
      title: (
        <FormattedMessage
          id='pages.employee.searchTable.employeeSex'
          defaultMessage='性别'
        />
      ),
      dataIndex: 'sex',
      valueType: 'textarea'
    },
    {
      title: (
        <FormattedMessage
          id='pages.employee.searchTable.handler'
          defaultMessage='操作'
        />
      ),
      render: (_, entity) => {
        return (<>
          <a onClick={()=>{console.log(entity)}}>修改</a>&nbsp;&nbsp;
          <a onClick={()=>{console.log('handler delete')}}>删除</a>
        </>)
      }
    },
  ]
  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.employee.searchTable.title',
          defaultMessage: '查询表格'
        })}
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        request={(params,sorter,filter)=> getEmployeeData({ ...params, sorter, filter }) }
        columns={employeeColumns}
        rowKey="id"
        rowSelection={{}}
        toolBarRender={() => [
          <Button
            type='primary'
            key='primary'
            onClick={() => {
              setCreateEmployeeVisible(true);
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
          defaultMessage: '添加员工',
        })}
        width='800px'
        visible={createEmployeeVisible}
        onVisibleChange={setCreateEmployeeVisible}
        onFinish={async (value) => {
          // 这里发送请求

          createModalOnFinish(value);
        }}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
                message: '姓名为必填项'
              },
            ]}
            width='md'
            name='name'
            label='姓名'
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: '身份证为必填项'
              },
            ]}
            width='md'
            name='id_code'
            label='身份证'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
                message: '手机为必填项'
              },
            ]}
            width='md'
            name='phone'
            label='手机号'
          />
          <ProForm.Group>
            <ProFormSelect
              rules={[
                {
                  required: true,
                  message: '性别为必填项'
                }
              ]}
              width="xs"
              options={[
                {
                  value: '1',
                  label: '男',
                },
                {
                  value: '2',
                  label: '女',
                },
              ]}
              name="sex"
              label="性别"
            />
            <ProFormDatePicker
              name='birthday'
              label='生日'
            />
          </ProForm.Group>
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width='md'
            name='wechat'
            label='微信'
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id='pages.employee.searchTable.employeeEmail'
                    defaultMessage='邮箱为必填项'
                  />
                ),
              },
            ]}
            width='md'
            name='email'
            label='邮箱'
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormCheckbox.Group
            rules={[
              {
                required: true,
                message: '技能为必填项'
              }
            ]}
            name="skills"
            label="技能类型"
            options={[
              {
                value: '1',
                label: '水工'
              },
              {
                value: '2',
                label: '电工'
              },
              {
                value: '3',
                label: '排污'
              },
              {
                value: '4',
                label: '土建'
              },
              {
                value: '5',
                label: '木工'
              },
              {
                value: '6',
                label: '设备'
              },
              {
                value: '7',
                label: '邻里调解'
              },
            ]}
          />
          <ProFormSelect
            rules={[
              {
                required: true,
                message: '权限为必填项'
              }
            ]}
            width="xs"
            options={[
              {
                value: '1',
                label: '管理员',
              },
              {
                value: '0',
                label: '普通员工',
              },
            ]}
            name="super_state"
            label="权限等级"
          />
        </ProForm.Group>
      </ModalForm>

      <Drawer
        width={600}
        visible={employeeInfoVisible}
        onClose={() => {
          setCurrentRow(undefined)
          setEmployeeInfoVisible(false);
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
            columns={employeeColumns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default EmployeeManagement;
