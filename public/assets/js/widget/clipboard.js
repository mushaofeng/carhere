define('widget/clipboard',[],function  () {
	function clipboard () {
		// 复制粘贴功能
		var client = new ZeroClipboard( $('.clip_board') );
		client.on( 'copy',function( event ) {
				var clipboard = event.clipboardData;
				clipboard.setData( 'text/plain', $(event.target).data('clip') );
		});	
	}	
	return clipboard;
})
