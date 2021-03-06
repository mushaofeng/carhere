require(['g'],function  (G) {
	// body...
	G.init()
	$(".add_input").on('click',function  () {
		var $content = $(this).parent().next(),
				$el=$content.find("input").eq(0).html('').clone()
		$content.append($el);
	})
	// 标签
	$(".tag_sel").on('click',function  () {
		if($(this).hasClass("label-success")){
			$(this).removeClass("label-success")
		}else{
			$(this).addClass("label-success")
		}
	})
	$(".tag_close").on('click',function  () {
			$(this).remove();
	})	
	$(".tag_submit").on('click',function  () {
		$selEl=$("#tagModal .modal-body").find('.label-success')
		$("#tag-content").append($selEl);
	})
	// 图片删除
	$(".btn-delete").on('click',function  (e) {
		var el=$(this),
			id=el.data("id"),
			url=el.data("url");
		$.ajax({
		  url: url+id,
		  success: function(res){
		  	el.closest("tr").remove();
		  	console.log( res );
		  	// alert(res)
		  }
		});		

	})


	// 汽车列表
	$(".car_list_submit").on('click',function  () {
		$trs=$("#carModal .modal-body").find('input:checked').parents('tr');
		$("#carBody").append($trs);
	})
	$(".list_del").on('click',function  () {
		$("#carBody input:checked").parents('tr').remove();
	})
  $(function() {
    $("#carBody").sortable();
    $("#carBody").disableSelection();
  });

  // search
  $("#searchBtn").on('click',function  () {
  	// body...
  	var url='/api/car?s='+$("#searchCar").val();
  	$.ajax({
  		url:url,
  		dataType:'html',
  		success:function  (html) {
  			$("#carModal tbody").html(html)
  		}
  	})
  })
})