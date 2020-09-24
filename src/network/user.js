import {request} from './request'

//获取验证码
export function getCaptchas(){
  return request({
    url:'/v1/captchas',
    method:'post'
  })
}
//登录
export function loginUser(username,password,captcha_code){
  return request({
    url:'/v2/login',
    method:'post',
    data:{
      username,
      password,
      captcha_code
    }
  })
}

//修改密码
export function changePassword(username,oldpassWord,newpassword,confirmpassword,captcha_code){
  return request({
    url:'/v2/changepassword',
    method:'post',
    data:{
      username,
      oldpassWord,
      newpassword,
      confirmpassword,
      captcha_code
    }
  })
}

//用户信息
export function getUserInfo(){
  return request({
    url:"/v1/user"
  })
}


//退出
export function signOut(){
  return request({
    url:"/v2/signout"
  })
}