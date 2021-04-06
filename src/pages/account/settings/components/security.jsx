import { FormattedMessage, connect } from 'umi';
import React, { Component, useRef, useState } from 'react';
import { List, message } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { changePassWord } from '@/pages/account/settings/service';

const SecurityView = (props) => {
  const modifyPasswordRef = useRef();
  const modifyPhoneRef = useRef();
  const [modifyPasswordVisible, setModifyPasswordVisible] = useState(false);
  const [modifyPhoneVisible, setModifyPhoneVisible] = useState(false);

  const handleModifyPassword = () => {
    setModifyPasswordVisible(true)
  };

  const handleModifyPhone = () => {
    setModifyPhoneVisible(true)
  }

  const getData = () => [
    {
      title: '修改密码',
      actions: [
        <a key='Modify' onClick={handleModifyPassword}>
          修改
        </a>,
      ],
    },
    {
      title: '密保手机',
      actions: [
        <a key='Modify' onClick={handleModifyPhone}>
          修改
        </a>,
      ],
    },
  ];

  const handleModifyPhoneOnFinish = async (val) =>{
    const { oph, nph, rph } = val
    console.log(props.userData);
    const { userData } = props;
    if(oph !== userData.phone){
      message.error('旧手机号码不正确，请检查输入', 2)
      return
    }
    if(oph.length !== 11){
      message.error('手机号码格式错误，请检查输入', 2)
      return
    }
    if(rph !== nph){
      message.error('', 2)
      return
    }
    const success = await changePassWord({phone: rph});
    console.log(success);
    if(success.code === 200){
      message.success('修改成功，即将回到登录页面，请重新登录', 2,()=>{
        // history.push('/basic/residential')
        props.dispatch({type: 'login/logout'})
      })
    }else {
      message.error('密码修改失败', 2)
    }
  }

  const handleModifyPasswordOnFinish =async val => {
    const { opw, npw, rpw } = val
    console.log(props.userData);
    const { userData } = props;
    if(opw !== userData.password){
      message.error('旧密码不正确，请重新确认，若忘记密码可以用身份证重置密码', 2)
      return
    }
    if(opw.length < 6){
      message.error('密码长度过短，至少为六位，请重新输入', 2)
      return
    }
    if(rpw !== npw){
      message.error('两次密码输入不一致，请检查输入', 2)
      return
    }
    const success = await changePassWord({password: rpw});
    console.log(success);
    if(success.code === 200){
      message.success('修改成功，即将回到登录页面，请重新登录', 2,()=>{
        props.dispatch({type: 'login/logout'})
      })
    }else {
      message.error('密码修改失败', 2)
    }
  }

  const data = getData();
  return (
    <>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <ModalForm
        title='修改密码'
        width='500px'
        visible={modifyPasswordVisible}
        onVisibleChange={setModifyPasswordVisible}
        formRef={modifyPasswordRef}
        onFinish={async val=>{ await handleModifyPasswordOnFinish(val) }}
      >
        <ProFormText
          label='旧密码'
          name='opw'
        />
        <ProFormText
          label='新密码'
          name='npw'
        />
        <ProFormText
          label='重复一次新密码'
          name='rpw'
        />
      </ModalForm>

      <ModalForm
        title='修改手机号'
        width='500px'
        visible={modifyPhoneVisible}
        onVisibleChange={setModifyPhoneVisible}
        formRef={modifyPhoneRef}
        onFinish={async val=>{ await handleModifyPhoneOnFinish(val) }}
      >
        <ProFormText
          label={`请输入原手机号码`}
          name='oph'
          placeholder={`提示${props.userData.phone.slice(0,3)}****${props.userData.phone.slice(7,11)}`}
        />
        <ProFormText
          label='新手机号码'
          name='nph'
        />
        <ProFormText
          label='重复一次新手机号码'
          name='rph'
        />
      </ModalForm>
    </>
  );
};


const stateMapToProps = ({user}) => {
  return {
    userData: user.currentUser,
  }
}


export default connect(stateMapToProps)(SecurityView);
