$(function  () {
	// 复制粘贴功能
	var client = new ZeroClipboard( $('.clip_board') );
	client.on( 'copy',function( event ) {
			var clipboard = event.clipboardData;
			console.log( $(event.target).data('clip')  );
			clipboard.setData( 'text/plain', $(event.target).data('clip') );
	});	
})