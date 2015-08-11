define('g',['widget/animate','widget/clipboard'],function  (Animate,Clipboard) {
	var G={};
	function navInit () {
    	if($(document).scrollTop()>50){
    		$('.topNav').addClass('nav-fixed');
    	}else{
    		$('.topNav').removeClass('nav-fixed');
    	}		
	}

    G.init = function  () {
		new Animate();
		new Clipboard();
	    $(window).scroll(function  () {
	    	new Animate();
	    	navInit();
	    })    	
    }
    return G;
})