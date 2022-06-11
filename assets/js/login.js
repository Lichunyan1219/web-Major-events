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
  const baseUrl = 'http://www.liulongbin.top:3007'
  //监听表单提交事件，发送注册请求
  $('#form_reg').submit((e) => {
    e.preventDefault()
    //发送请求
    $.ajax({
      type: 'POST',
      url: "/my/userinfo",
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val(),
      },
      success: (res) => {
        console.log(res)
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功')
        $('#link_login').click()
        $('.layui-input').val('')
        $('#form_reg [.layui-input]').val('')
      },
    })
  })
  //监听登录按钮，发送登录请求
  $('#form_login').submit(function (e) {
    e.preventDefault()
    console.log($(this).serialize())
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        //将身份密钥tokeb存在本地存储中
        localStorage.setItem('token', res.token)
        //跳转到主页页面
        location.href = '/index.html'
      },
    })
  })
})
