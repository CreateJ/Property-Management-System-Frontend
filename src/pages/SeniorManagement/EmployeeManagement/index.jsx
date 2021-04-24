import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { useIntl, FormattedMessage, connect } from 'umi';
import React, { useRef, useState } from 'react';
import { getEmployeeData, employeeRegister, deleteEmployee } from './service';
import { Button, Drawer, message } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProForm, {
  ModalForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import {
  sexTransToFrontend,
  skillTransToBackend,
  skillTransToFrontend,
  timeTransToBackend,
  timeTransToFrontend,
} from '@/utils/transformUtils';
import { modifyEmployee } from '@/services/user';

const EmployeeManagement = (props) => {
  const actionRef = useRef();
  const modifyRef = useRef();
  const [currentRow, setCurrentRow] = useState({});
  const [employeeInfoVisible, setEmployeeInfoVisible] = useState(false);
  const [createEmployeeVisible, setCreateEmployeeVisible] = useState(false);
  const [modifyVisible, setModifyVisible] = useState(false);
  const intl = useIntl();

  const clickEmployeeName = async (entity) => {
    setCurrentRow(entity);
    setEmployeeInfoVisible(true);
  };

  // 创建员工模态框点击提交触发的事件
  const createModalOnFinish = async (value) => {
    const params = JSON.parse(JSON.stringify(value));

    const birthday = timeTransToBackend(value.birthday);
    console.log(value.birthday);
    console.log(birthday);
    params.skills = skillTransToBackend(value.skills);
    params.birthday = birthday;
    params.user_type = 2;
    params.num = 1;
    const success = await employeeRegister(params);
    console.log(success);
    if (success.code === 200) {
      setCreateEmployeeVisible(false);
      if (actionRef.current) {
        // 自动触发组件自带的reload方法，发送query请求
        actionRef.current.reload();
      }
    }
  };

  const queryData = async (params, _s, _f) => {
    const queryParams = {
      page: params.current,
      page_size: params.pageSize,
      user_type: 2,
      ...params,
    };
    delete queryParams.current;
    delete queryParams.pageSize;
    console.log(queryParams, '多条件查询参数');
    const success = await getEmployeeData({ ...queryParams });
    if (success.code === 200) {
      const newRes = {
        current: queryParams.page,
        pageSize: queryParams.page_size + '',
        data: success.data.users,
        total: success.data.total,
      };
      console.log(newRes);
      return newRes;
    } else {
      message.error('添加失败请重试！');
      return {};
    }
  };

  const handleDelete = async (user) => {
    console.log(user.id);
    const success = await deleteEmployee(user.id);
    console.log(success, 'deleteEmployee');
    if (success.code === 200) {
      message.success('删除成功，即将刷新列表', 1, () => {
        if (actionRef.current) {
          // 自动触发组件自带的reload方法，发送query请求
          actionRef.current.reload();
        }
      });
    }
  };

  const handleModify = async (user) => {
    console.log(user);
    const _user = JSON.parse(JSON.stringify(user));
    _user.birthday = timeTransToFrontend(_user.birthday);
    _user.skills = skillTransToFrontend(_user.skills);
    modifyRef.current.setFieldsValue(_user);
    setCurrentRow(user);
    setModifyVisible(true);
  };

  const modifyOnFinish = async (values) => {
    const _user = JSON.parse(JSON.stringify(values));
    _user.birthday = timeTransToBackend(_user.birthday);
    _user.skills = skillTransToBackend(_user.skills);
    _user.id = currentRow.id;
    console.log(_user);
    const success = await modifyEmployee(_user);
    console.log(success);
    if (success.code === 200) {
      message.success('修改成功', 2);
    } else {
      message.success('修改失败，请检查重试', 2);
    }
    setModifyVisible(false);
    if (actionRef) {
      actionRef.current.reload();
    }
  };

  // 员工表 列数据
  const employeeColumns = [
    {
      title: <FormattedMessage id="pages.employee.searchTable.employeeId" defaultMessage="工号" />,
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage id="pages.employee.searchTable.employeeName" defaultMessage="姓名" />
      ),
      dataIndex: 'name',
      valueType: 'textarea',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              clickEmployeeName(entity);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage id="pages.employee.searchTable.employeeIdCode" defaultMessage="姓名" />
      ),
      dataIndex: 'id_code',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage id="pages.employee.searchTable.employeeBirthday" defaultMessage="生日" />
      ),
      dataIndex: 'birthday',
      valueType: 'textarea',
      renderText: (val) => `${timeTransToFrontend(val)}`,
    },
    {
      title: <FormattedMessage id="pages.employee.searchTable.employeeSex" defaultMessage="性别" />,
      dataIndex: 'sex',
      valueType: 'textarea',
      renderText: (val) => `${sexTransToFrontend(val)}`,
    },
    {
      title: <FormattedMessage id="pages.employee.searchTable.handler" defaultMessage="操作" />,
      render: (_, entity) => {
        return (
          <>
            <a
              onClick={async () => {
                await handleModify(entity);
              }}
            >
              修改
            </a>
            &nbsp;&nbsp;
            <a
              onClick={async () => {
                await handleDelete(entity);
              }}
            >
              删除
            </a>
          </>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.employee.searchTable.title',
          defaultMessage: '查询表格',
        })}
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        request={(params, sorter, filter) => queryData(params, sorter, filter)}
        columns={employeeColumns}
        rowKey="id"
        rowSelection={{}}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateEmployeeVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
      ></ProTable>

      <ModalForm
        title={intl.formatMessage({
          id: 'pages.residential.searchTable.createFrom.newResidential',
          defaultMessage: '添加员工',
        })}
        width="800px"
        visible={createEmployeeVisible}
        onVisibleChange={setCreateEmployeeVisible}
        onFinish={async (value) => {
          await createModalOnFinish(value);
        }}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
                message: '姓名为必填项',
              },
            ]}
            width="md"
            name="name"
            label="姓名"
          />
          <ProFormText
            rules={[
              {
                required: true,
                message: '身份证为必填项',
              },
            ]}
            width="md"
            name="id_code"
            label="身份证"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
                message: '手机为必填项',
              },
            ]}
            width="md"
            name="phone"
            label="手机号"
          />
          <ProForm.Group>
            <ProFormSelect
              rules={[
                {
                  required: true,
                  message: '性别为必填项',
                },
              ]}
              width="xs"
              options={[
                {
                  value: 1,
                  label: '男',
                },
                {
                  value: 2,
                  label: '女',
                },
              ]}
              name="sex"
              label="性别"
            />
            <ProFormDatePicker name="birthday" label="生日" />
          </ProForm.Group>
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="wechat" label="微信" />
          <ProFormText
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.employee.searchTable.employeeEmail"
                    defaultMessage="邮箱为必填项"
                  />
                ),
              },
            ]}
            width="md"
            name="email"
            label="邮箱"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormCheckbox.Group
            rules={[
              {
                required: true,
                message: '技能为必填项',
              },
            ]}
            name="skills"
            label="技能类型"
            options={[
              {
                value: '1',
                label: '水工',
              },
              {
                value: '2',
                label: '电工',
              },
              {
                value: '3',
                label: '排污',
              },
              {
                value: '4',
                label: '土建',
              },
              {
                value: '5',
                label: '木工',
              },
              {
                value: '6',
                label: '设备',
              },
              {
                value: '7',
                label: '邻里调解',
              },
            ]}
          />
          <ProFormSelect
            rules={[
              {
                required: true,
                message: '权限为必填项',
              },
            ]}
            width="xs"
            options={[
              {
                value: 2,
                label: '管理员',
              },
              {
                value: 1,
                label: '普通员工',
              },
            ]}
            name="super_state"
            label="权限等级"
          />
        </ProForm.Group>
      </ModalForm>

      {/*修改员工信息模态框*/}
      <ModalForm
        formRef={modifyRef}
        title="修改员工信息"
        width="800px"
        visible={modifyVisible}
        onVisibleChange={setModifyVisible}
        onFinish={async (value) => {
          await modifyOnFinish(value);
        }}
      >
        <ProForm.Group>
          <ProFormText width="md" name="name" label="姓名" />
          <ProFormText readonly width="md" name="id_code" label="身份证" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="phone" label="手机号" />
          <ProForm.Group>
            <ProFormSelect
              width="xs"
              options={[
                {
                  value: 1,
                  label: '男',
                },
                {
                  value: 2,
                  label: '女',
                },
              ]}
              name="sex"
              label="性别"
            />
            <ProFormDatePicker name="birthday" label="生日" />
          </ProForm.Group>
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="wechat" label="微信" />
          <ProFormText width="md" name="email" label="邮箱" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormCheckbox.Group
            name="skills"
            label="技能类型"
            options={[
              {
                value: '1',
                label: '水工',
              },
              {
                value: '2',
                label: '电工',
              },
              {
                value: '3',
                label: '排污',
              },
              {
                value: '4',
                label: '土建',
              },
              {
                value: '5',
                label: '木工',
              },
              {
                value: '6',
                label: '设备',
              },
              {
                value: '7',
                label: '邻里调解',
              },
            ]}
          />
          <ProFormSelect
            width="xs"
            readonly
            options={[
              {
                value: 1,
                label: '管理员',
              },
              {
                value: 0,
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
          setCurrentRow(undefined);
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

export default connect()(EmployeeManagement);
