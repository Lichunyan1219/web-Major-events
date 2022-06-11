//获取用户信息S
function geiUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    success: function (res) {
      if (res.status !== 0) return layer.msg(res.message)
      layer.msg(res.message)
      // console.log(res)
      renderAvatar(res.data)
      console.log(11);
    },
    // complete:(res)=>{
    //   console.log(res);
    //   if(res.responseJSON.status==1 && res.responseJSON.message=="身份认证失败！"){
    //     localStorage.removeItem('token')
    //     location.href="/login.html"
    //   }
    // }
  })
}
geiUserInfo()
const renderAvatar = (user) => {
  const name = user.nickname || user.username
  $('#welcome').html(`欢迎 ${name}`)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    let fitr = name[0].toUpperCase()
    $('.text-avatar').html(fitr).show()

    console.log(name);
  }
}
//退出功能实现
$('#btnLogin').click(() => {
  layui.layer.confirm(
    '确定退出登录？', {
      icon: 3,
      title: ''
    },
    function (index) {
      // 清空本地存储里面的 token
      localStorage.removeItem('token')
      // 重新跳转到登录页面
      location.href = '/login.html'
    }
  )
})