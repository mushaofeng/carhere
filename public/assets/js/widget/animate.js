define('widget/animate',[],function  () {
	$.fn.carAnimate = function  () {
		$(this).addClass("bounceInRight").removeAttr("data-animate");
	}     
	function carAnimate () {
    	if($("[data-animate]").length==0){
    		return;
    	}
    	$("[data-animate]").each(function  (i,o) {
			var h= $(o).offset().top - $(document).scrollTop();
			if(h>0 && h< $(window).height() ){
					$(o).carAnimate();
			}	
    	})		
	}			
	return carAnimate;
})
