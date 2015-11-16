(function($) {
	var source   = $("#issue-template").html();
	var template = Handlebars.compile(source);
	var last = 31;
	
	if(
		window.location.hash !== '' && 
		parseInt(window.location.hash.replace('#', '')) > 0 && 
		window.location.hash.replace('#', '') <= last
	) {
		loadContent(window.location.hash.replace('#', ''));
	} else {
		loadContent(last);
	}
	
	$('.issue').click(function(e) {
		var toLoad = false;
		
		if($(e.target).hasClass('next') || $(e.target).hasClass('prev')) {
			toLoad = $(e.target).attr('href').replace('#', '');
		}
		
		if(toLoad) {
			loadContent(toLoad);
		}
	});
	
	function loadContent(issue) {
		$.getJSON("issues/"+issue+".json?token=" + new Date().getTime(), function(data) {	
			if(parseInt(last) > parseInt(data.number)) {
				data.next = true;
				data.nextNumber = data.number * 1 + 1;
			}
			
			if(parseInt(data.number) > 1) {
				data.prev = true;
				data.prevNumber = data.number * 1 - 1;
			}
			
			var issue_content = template(data);
			$('.issue').html(issue_content);
		});
	}
})(jQuery);
