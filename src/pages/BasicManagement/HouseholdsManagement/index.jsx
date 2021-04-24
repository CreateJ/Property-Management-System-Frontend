import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Drawer, message } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import ProForm, {
  ModalForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import {
  sexTransToFrontend,
  timeTransToBackend,
  timeTransToFrontend,
} from '@/utils/transformUtils';
import {
  deleteHousehold,
  getHouseholdData,
  householdRegister,
  modifyHousehold,
  queryHouseholdData,
} from '@/pages/BasicManagement/HouseholdsManagement/services';

const HouseholdsManagement = (props) => {
  const actionRef = useRef();
  const [createVisible, setCreateVisible] = useState(false);
  const [modifyVisible, setModifyVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const modifyForm = useRef();
  const [householdInfoVisible, setHouseholdInfoVisible] = useState(false);
  const intl = useIntl();

  const clickHouseholdName = (entity) => {
    setCurrentRow(entity);
    setHouseholdInfoVisible(true);
  };

  const createModalOnFinish = async (values) => {
    const params = JSON.parse(JSON.stringify(values));
    const birthday = timeTransToBackend(values.birthday);
    params.birthday = birthday;
    params.user_type = 1; // 住户
    params.num = parseInt(params.num);
    console.log(params);
    const success = await householdRegister(params);
    console.log(success);
    if (success.code == 200) {
      message.success('添加成功');
      setCreateVisible(false);
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
      user_type: 1,
      ...params,
    };
    delete queryParams.current;
    delete queryParams.pageSize;
    console.log(queryParams, '多条件查询参数');
    const success = await queryHouseholdData({ ...queryParams });
    console.log(success);
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

  const handleModify = async (user) => {
    await setModifyVisible(true);
    const _user = JSON.parse(JSON.stringify(user));
    _user.birthday = timeTransToFrontend(_user.birthday);
    setCurrentRow(user);
    modifyForm.current.setFieldsValue(_user);
  };

  const handleDelete = async (user) => {
    console.log(user.id);
    const success = await deleteHousehold(user.id);
    console.log(success, 'deleteHousehold');
    if (success.code === 200) {
      message.success('删除成功，即将刷新列表', 1, () => {
        if (actionRef.current) {
          // 自动触发组件自带的reload方法，发送query请求
          actionRef.current.reload();
        }
      });
    }
  };

  const modifyModalOnFinish = async (value) => {
    const _user = JSON.parse(JSON.stringify(value));
    _user.birthday = timeTransToBackend(_user.birthday);
    _user.num = parseInt(_user.num);
    const params = {
      id: currentRow.id,
      ..._user,
    };
    console.log(params);
    const success = await modifyHousehold(params);
    console.log(success);
    if (success.code === 200) {
      message.success('修改成功，即将刷新列表', 2, () => {
        if (actionRef.current) {
          // 自动触发组件自带的reload方法，发送query请求
          actionRef.current.reload();
        }
      });
    }
    setModifyVisible(false);
  };

  // 员工表 列数据
  const householdColumns = [
    {
      title: (
        <FormattedMessage id="pages.household.searchTable.householdId" defaultMessage="住户号" />
      ),
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage id="pages.household.searchTable.householdName" defaultMessage="姓名" />
      ),
      dataIndex: 'name',
      valueType: 'textarea',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              clickHouseholdName(entity);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.household.searchTable.householdIdCode"
          defaultMessage="身份证"
        />
      ),
      dataIndex: 'id_code',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.household.searchTable.householdBirthday"
          defaultMessage="生日"
        />
      ),
      dataIndex: 'birthday',
      valueType: 'textarea',
      renderText: (val) => `${timeTransToFrontend(val)}`,
    },
    {
      title: (
        <FormattedMessage id="pages.household.searchTable.householdSex" defaultMessage="性别" />
      ),
      dataIndex: 'sex',
      valueType: 'textarea',
      renderText: (val) => `${sexTransToFrontend(val)}`,
    },
    {
      title: <FormattedMessage id="pages.household.searchTable.handler" defaultMessage="操作" />,
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
          id: 'pages.household.searchTable.title',
          defaultMessage: '查询表格',
        })}
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        request={(params, sorter, filter) => queryData(params, sorter, filter)}
        columns={householdColumns}
        rowKey="id"
        rowSelection={{}}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
      ></ProTable>

      <ModalForm
        title="添加住户"
        width="800px"
        visible={createVisible}
        onVisibleChange={setCreateVisible}
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
            <ProFormDatePicker
              rules={[
                {
                  required: true,
                  message: '身份证为必填项',
                },
              ]}
              name="birthday"
              label="生日"
            />
          </ProForm.Group>
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="wechat" label="微信" />
          <ProFormText
            rules={[
              {
                required: true,
                message: '邮箱为必填项',
              },
            ]}
            width="md"
            name="email"
            label="邮箱"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
                message: '家庭人口数为必填项',
              },
            ]}
            width="md"
            name="num"
            label="家庭人口数"
          />
        </ProForm.Group>
      </ModalForm>

      {/*修改信息模态框*/}
      <ModalForm
        formRef={modifyForm}
        title="修改住户信息"
        width="800px"
        visible={modifyVisible}
        onVisibleChange={setModifyVisible}
        onFinish={async (value) => {
          await modifyModalOnFinish(value);
        }}
      >
        <ProForm.Group>
          <ProFormText width="md" name="name" label="姓名" />
          <ProFormText width="md" name="id_code" label="身份证" readonly />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="phone" label="手机号" readonly />
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
            <ProFormDatePicker name="birthday" label="生日" readonly />
          </ProForm.Group>
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="wechat" label="微信" />
          <ProFormText width="md" name="email" label="邮箱" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="num" label="家庭人口数" />
        </ProForm.Group>
      </ModalForm>

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
  );
};

export default HouseholdsManagement;
