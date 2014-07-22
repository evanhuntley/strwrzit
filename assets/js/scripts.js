/* ==========================================================================
	Scripts
============================================================================= */	

	// Declare general variable
	var article = $('article');

	// Make the AJAX call, display new content
	function getWiki() {
		
		$.ajax({
		    url: 'http://en.wikipedia.org/w/api.php?action=query&generator=random&clshow=!hidden&grnnamespace=0&prop=extracts|info&inprop=url&exchars=1500&format=json',
		    data: {
		        format: 'json'
		    },
		    dataType: 'jsonp',
			success: function(data){
				for (var pageId in data.query.pages) {
					var excerpt = data.query.pages[pageId].extract;
					var newexcerpt = excerpt.split('</p>');
					var articleLink = '<a href="' + data.query.pages[pageId].fullurl + '">View Full Article: "' + data.query.pages[pageId].title + '"</a>';
					article.html(newexcerpt[0] + '</p>' + articleLink).addClass('on');
				}			
			}
		});			
		
	}

	// Document Ready
	$(document).ready(function() {	
		
		// Call Function on refresh	
		getWiki();
		
		// Call Function on click
		$('#button').click(function() {
			article.removeClass('on');
			getWiki();
		});
		
	});