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

	
	var tag = $("#TagCloud").data('tag'),word_array=[];
	for(var i=0;i<tag.length;i++){
		var o ={
			text:tag[i].name,
			weight:15-i,
			link:"http://"+location.host+"/tag?tag="+tag[i].name
		}
		word_array.push(o)
	}
	  // var word_array = [
	  //     {text: "Lorem", weight: 15},
	  //     {text: "Ipsum", weight: 9, link: "http://jquery.com/"},
	  //     {text: "Dolor", weight: 6, html: {title: "I can haz any html attribute"}},
	  //     {text: "Sit", weight: 7},
	  //     {text: "Amet", weight: 5}
	  //     // ...as many words as you want
	  // ];

	  $(function() {
	    // When DOM is ready, select the container element and call the jQCloud method, passing the array of words as the first argument.
	    $("#TagCloud").jQCloud(word_array);
	  });	
});