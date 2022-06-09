//获取用户信息
function geiUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('tokeb'),
    },
    success: function (res) {
      if (res.status !== 0) return layer.msg(res.message)
      layer.msg(res.message)
      console.log(res)
      renderAvatar(res.data)
    },
  })
}
geiUserInfo()
const renderAvatar = (user) => {
  const name = user.nickname || user.username
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    let fitr = name[0].toUpperCase()
    $('.text-avatar').html(fitr).show()
    $('#welcome').html(`欢迎 ${name}`)
  }
}
//退出功能实现
$('#btnLogin').click(() => {
  layui.layer.confirm(
    '确定退出登录？',
    { icon: 3, title: '' },
    function (index) {
      // 清空本地存储里面的 token
      localStorage.removeItem('token')
      // 重新跳转到登录页面
      location.href = '/login.html'
    }
  )
})
