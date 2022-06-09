$(function () {
  //登录注册切换
  $('#link_reg').click(() => {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').click(() => {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  //自定义校验规则
  //引入form来自layui
  const form = layui.form
  form.verify({
    //数组方法
    password: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
    // 对象方法
    repwd: (value) => {
      const pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) return '两次密码不一样'
    },
  })
  $('#form_reg').submit((e) => {
    e.preventDefault()
  })
})
