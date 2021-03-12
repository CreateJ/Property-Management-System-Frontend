import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { useIntl, FormattedMessage } from 'umi';
import React, { useEffect, useRef, useState } from 'react';
import { getEmployeeData } from './service';
import { Drawer } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';

const EmployeeManagement = () => {

  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState({})
  const [employeeInfoVisible, setEmployeeInfoVisible] = useState(false)
  const intl = useIntl();

  const clickEmployeeName = (entity) => {
    setCurrentRow(entity);
    setEmployeeInfoVisible(true);
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
      dataIndex: 'empId',
      valueType: 'textarea'
    },
    {
      title: (
        <FormattedMessage
          id='pages.employee.searchTable.employeeName'
          defaultMessage='姓名'
        />
      ),
      dataIndex: 'empName',
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
      dataIndex: 'empIdCode',
      valueType: 'textarea'
    },
    {
      title: (
        <FormattedMessage
          id='pages.employee.searchTable.employeeAge'
          defaultMessage='年龄'
        />
      ),
      dataIndex: 'empAge',
      valueType: 'textarea'
    },
    {
      title: (
        <FormattedMessage
          id='pages.employee.searchTable.employeeSex'
          defaultMessage='性别'
        />
      ),
      dataIndex: 'empSex',
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
        rowKey="empId"
        rowSelection={{}}
      >
      </ProTable>

      <Drawer
        width={600}
        visible={employeeInfoVisible}
        onClose={() => {
          setCurrentRow(undefined)
          setEmployeeInfoVisible(false);
        }}
        closable={false}
      >
        {currentRow?.empId && (
          <ProDescriptions
            column={2}
            title={currentRow?.empName}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.empId,
            }}
            columns={employeeColumns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default EmployeeManagement;
