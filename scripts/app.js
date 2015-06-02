(function($) {
	var source   = $("#issue-template").html();
	var template = Handlebars.compile(source);
	
	$.getJSON("issues/issues.json", function(data) {
		var last = data.last;
		
		$.getJSON("issues/"+last+".json", function(data) {	
			var issue_content = template(data);
			$('.issue').html(issue_content);
		});
	});
})(jQuery);