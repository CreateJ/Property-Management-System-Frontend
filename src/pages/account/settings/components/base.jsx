import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component, useEffect, useRef, useState } from 'react';
// import GeographicView from './GeographicView';
// import PhoneView from './PhoneView';
// import styles from './BaseView.less';
import ProForm, { ProFormCheckbox, ProFormDatePicker, ProFormText } from '@ant-design/pro-form';
import {
  skillTransToBackend,
  skillTransToFrontend,
  timeTransToBackend,
  timeTransToFrontend,
} from '@/utils/transformUtils';
import { modifyUserInfo } from '@/services/user';


const BaseView = (props) => {
  const userFormRef = useRef();
  const [userData, setUserData] = useState({})
  useEffect(()=>{
    fillForm();
  },[])

  const fillForm = () => {
    const user_tmp = JSON.parse(JSON.stringify(props.currentUser))
    user_tmp.birthday = timeTransToFrontend(user_tmp.birthday)
    user_tmp.skills = skillTransToFrontend(user_tmp.skills)
    setUserData(user_tmp)
    userFormRef.current.setFieldsValue(user_tmp)
  }

  const handleModify = async val => {
    console.log(val);
    const _user = JSON.parse(JSON.stringify(val))
    _user.skills = skillTransToBackend(_user.skills)
    _user.birthday = timeTransToBackend(_user.birthday)
    const success = await modifyUserInfo(_user)
    console.log(success);
    if(success.code === 200){
      message.success('更新个人信息成功')
      props.dispatch({type: 'user/fetchCurrent'})
    }else {
      message.error('修改失败，请确认网络正常')
    }

  }

  return (
    <div>
      <ProForm
        formRef={userFormRef}
        onReset={fillForm}
        onFinish={async (val) => {handleModify(val)}}
      >
        <ProFormText
          label="姓名"
          name="name"
          width="md"
        />
        <ProFormText
          label="身份证号"
          name="id_code"
          width="md"
          readonly
        />
        <ProFormDatePicker
          label="生日"
          name="birthday"
          width="md"
        />
        <ProFormText
          label="微信号"
          name="wechat"
          width="md"
        />
        <ProFormText
          label="邮箱"
          name="email"
          width="md"
        />
        <ProFormCheckbox.Group
          rules={[
            {
              required: true,
              message: '技能为必填项'
            }
          ]}
          readonly
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

      </ProForm>
    </div>
  )
}

const stateMapToProps = ({user}) => {
  return {
    currentUser: user.currentUser,
  }
}

export default connect(stateMapToProps)(BaseView);
