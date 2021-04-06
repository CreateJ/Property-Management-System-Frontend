import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api2/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api2/login/captcha?mobile=${mobile}`);
}


export async function userLogin(params){
  console.log(params);
  return request('/user/login',{
    method: 'POST',
    data: { ...params, user_type: 2} //浏览器端默认登录身份为员工
  })

}
