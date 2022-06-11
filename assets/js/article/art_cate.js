$(function () {
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

})