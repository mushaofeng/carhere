define('g',['widget/animate'],function  (Animate) {
	var G={};
	function navInit () {
    	if($(document).scrollTop()>50){
    		$('.topNav').addClass('nav-fixed');
    	}else{
    		$('.topNav').removeClass('nav-fixed');
    	}		
	}
	function clipboard (argument) {
		// 复制粘贴功能
		var client = new ZeroClipboard( $('.clip_board') );
		client.on( 'copy',function( event ) {
				var clipboard = event.clipboardData;
				clipboard.setData( 'text/plain', $(event.target).data('clip') );
		});	
	}
    G.init = function  () {
		Animate();
		clipboard();
	    $(window).scroll(function  () {
	    	Animate();
	    	navInit();
	    })    	
    }
    return G;
})