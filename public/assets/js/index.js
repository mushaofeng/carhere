require(['g','libs/jquery.flexslider'], function(G,Slider) {
	G.init();
    $('.flexslider').flexslider({
        animation: 'slide'
    });	
  $('.nav-tabs a:first').tab('show');
	$('.nav-tabs a').bind('mouseenter',function (e) {
	  e.preventDefault();
	  $(this).tab('show');
	})	
});