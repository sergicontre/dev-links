(function($) {
	var source   = $("#issue-template").html();
	var template = Handlebars.compile(source);
	var last = 0;
	
	$.getJSON("issues/issues.json", function(data) {
		last = data.last;
		
		$.getJSON("issues/"+last+".json?token=" + new Date().getTime(), function(data) {	
			if(parseInt(last) > parseInt(data.number)) {
				data.next = true;
				data.nextNumber = parseInt(data.number) + 1;
			}
			
			if(parseInt(data.number) > 1) {
				data.prev = true;
				data.prevNumber = parseInt(data.number) - 1;
			}
			
			var issue_content = template(data);
			$('.issue').html(issue_content);
		});
	});
	
	$('.issue').click(function(e) {
		var toLoad = false;
		
		if($(e.target).hasClass('next') || $(e.target).hasClass('prev')) {
			toLoad = $(e.target).attr('href').replace('#', '');
		}
		
		if(toLoad) {
			$.getJSON("issues/"+toLoad+".json?token=" + new Date().getTime(), function(data) {	
				if(parseInt(last) > parseInt(data.number)) {
					data.next = true;
					data.nextNumber = data.number + 1;
				}
				
				if(parseInt(data.number) > 1) {
					data.prev = true;
					data.prevNumber = data.number - 1;
				}
				
				var issue_content = template(data);
				$('.issue').html(issue_content);
			});
		}
	});
})(jQuery);