$(function () {
    const form = layui.form;
    //自定义验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        //判断新密码和确认密码是否一致
        samePwd: (value) => {
            if (value === $('[name=oldPwd]').val()) return '新密码不能和旧密码相同'

            //检验两次密码是否一致
        },
        rsPwd: (value) => {
            if (value !== $('[name=newPwd]').val()) return '两次输入的密码不一致';
        }
    })
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                //1.清空本地存储的token
                localStorage.removeItem('token');
                //2.跳转到登录页面
                window.parent.location.href = '/login.html';
            }
        })
    })
})