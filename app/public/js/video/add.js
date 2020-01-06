layui.config({
  base: '/public/js/',
}).use([ 'form', 'layer', 'jquery' ], function() {
  const form = layui.form,
    layer = parent.layer === undefined ? layui.layer : parent.layer,
    $ = layui.jquery;
  // 添加视频
  $('.linksAdd_btn').click(function() {
    const index = layui.layer.open({
      title: '添加视频',
      type: 2,
      content: [ '/admin/video/add' ],
      area: [ '850px', '800px' ],
    });
    // 改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
    $(window)
      .resize(function() {
        layui.layer.full(index);
      });
    layui.layer.full(index);
  });
  form.on('submit(add)', function() {
    const myform = new FormData();
    myform.append('title', $('#title').val());
    myform.append('category', $('#category option:selected').val());
    myform.append('file1', $('#file1')[0].files[0]);
    myform.append('file2', $('#file2')[0].files[0]);
    myform.append('description', $('#description').val());
    $.ajax({
      url: '/admin/video/create',
      type: 'post',
      data: myform,
      async: false,
      contentType: false,
      processData: false,
      success(result) {
        if (result) {
          top.layer.msg('视频添加成功！');
          layer.closeAll('iframe');
          // 刷新父页面
          parent.location.reload();
        }
      },
    });
  });
});
