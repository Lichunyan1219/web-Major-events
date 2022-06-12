$(function () {
    const form = layui.form;
    // 初始化富文本编辑器
    initEditor()
    const initCode = () => {
        // 获取文章分类
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("初始化文章分类失败！");
                }
                // 调用模板引擎，渲染分类的下拉菜单
                var htmlStr = template("tpl-cate", res);
                $("[name=cate_id]").html(htmlStr);
                // 一定要记得调用 form.render() 方法 否则看不到页面的变化
                form.render();
            },
        });
    };
    initCode()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })
    //获取上传图片的
    $('#coverFile').change((e) => {
        const files = e.target.files.length
        if (files === 0) return
        //1.获取图片
        const file = e.target.files[0]
        //2.把图片转换成url
        const newImgURL = URL.createObjectURL(file)
        //3.把url设置给img
        $image.cropper('destroy').attr('src', newImgURL).cropper(options)
    })
    //发布文章数据整合
    let art_state = '已发布'
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })
    $('#form-pub').submit(function (e) {
        e.preventDefault();
        //创建一个FormData对象
        const fd = new FormData($(this)[0])
        fd.append('state', art_state)
        // console.log(fd.get('title'));
        // console.log(fd.get('cate_id'));
        // console.log(fd.get('content'));
        // console.log(fd.get('state'));
        // 将封面裁剪过后的图片， 输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 发起 ajax 数据请求
                // console.log(fd.get('cover_img'));
                publishArticle(fd)
            })
    })
    //发布文章
    const publishArticle = (fd) => {
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: (res) => {
                if (res.status !== 0) return layer.msg('发布文章失败！')
                layer.msg('发布文章成功！')
                // 跳转到文章列表页(未作处理)
                location.href = '/article/art_list.html'
                //文章列表高亮切换
                window.parent.$('#btn-list').click()
            }
        })
    }
})