$(function () {
    //配置头像裁剪插件
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //模拟图片上传点击事件
    $('#btnChooseImage').click(() => {
        $('#file').click()
    })
    //给文件上传控件绑定change事件
    $('#file').change(function (e) {
        //1。获取文件对象
        const fileLength = e.target.files.length
        //2.判断文件是否存在
        if (fileLength == 0) return
        const file = e.target.files[0]
        //2.把文件对象转换为url地址
        const fileUrl = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper("destroy") // 销毁旧的裁剪区域
            .attr("src", fileUrl) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    })
    //渲染更改头像
    $('#btnUstad').click(function () {
        // 1、拿到用户裁切之后的头像
        // 直接复制代码即可
        const dataURL = $image.cropper("getCroppedCanvas", {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100,
            })
            .toDataURL("image/png");
        // 2、发送 ajax 请求，发送到服务器
        $.ajax({
            type: "POST",
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg('上传失败');
                layer.msg('上传成功');
                //更新用户头像
                window.parent.geiUserInfo();

            }
        })
    })

})