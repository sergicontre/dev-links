(function($) {
	var source   = $("#issue-template").html();
	var template = Handlebars.compile(source);
	
	$.ajax({
		"url": "issues/1.json"
	}).done(function(data) {
		var issue_content = template(data);
	
		$('.issue').html(issue_content);
	});
})(jQuery);