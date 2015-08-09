require(['g'],function  (G) {
	// body...
	G.init()
console.log( 4444 );
	$(".add_input").on('click',function  () {
		var $content = $(this).parent().next(),
				$el=$content.find("input").eq(0).html('').clone()

		console.log( $el );
		$content.append($el);
	})
	
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
		console.log( $selEl );
		$("#tag-content").append($selEl);
	})
})