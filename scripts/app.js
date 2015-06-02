(function($) {
	var source   = $("#issue-template").html();
	var template = Handlebars.compile(source);
	
	$.getJSON("issues/1.json", function(data) {
		var issue_content = template(data);
		$('.issue').html(issue_content);
	});
})(jQuery);