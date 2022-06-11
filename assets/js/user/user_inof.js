$(function () {
    const form = layui.form
    form.verify({
        nickname: (value) => {
            if (value.length > 6) return '用户名称不能超过六位'
        }
    })
    //获取用户信息
    const initUser = () => {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                // layer.msg('获取用户信息成功')
                form.val('formUserInfo', res.data)
            },
        })
    }
    //重置表单
    $('#BtnReset').click((e) => {
        e.preventDefault()
        initUser()
    })
    initUser()
    //更新用户信息
    // 更新用户数据
    $(".layui-form").submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("更新用户信息失败！");
                layer.msg("更新用户信息成功！");
                // 调用父页面渲染函数
                window.parent.geiUserInfo();
            },
        });
    })


})