$(function () {
    const form = layui.form
    const initArticleList = () => {
        //获取数据
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取文章分类列表失败');
                //渲染数据到模板
                const htmlUrl = template('tpl-table', res);
                $('tbody').empty().html(htmlUrl);
            }
        })
    }
    initArticleList()
    //弹出框
    let indexAdd = null;
    const layer = layui.layer
    $('#btnAddicted').click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-add').html(),
        })
    })
    //添加文章分类
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('添加文章分类失败');
                layer.msg('添加文章分类成功');
                initArticleList()
                layer.close(indexAdd);
            }
        })
    })
    //编辑文章分类  
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        const id = $(this).attr("data-id")
        console.log(id);
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        })

        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取文章分类失败')
                form.val('form-edit', res.data)
            }

        })
    })
    //修改文章分类
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('修改文章分类失败')
                layer.msg('修改文章分类成功')
                //重新渲染数据
                initArticleList()
                //关闭弹出框
                layer.close(indexEdit)
            }
        })
    })
    //删除文章分类
    $('tbody').on('click', '.btn-delete', function () {
        const id = $(this).attr("data-id")
        layer.confirm("确定删除吗？", {
            icon: 3,
            title: "提示"
        }, function (index) {
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("删除分类失败！");
                    }
                    layer.msg("删除分类成功！");
                    layer.close(index);
                    initArticleList()
                },
            });
        });

    })

})