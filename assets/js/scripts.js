
	function getWiki() {

		$.ajax({
		    url: 'http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts|info&inprop=url&exchars=1000&format=json',
		    data: {
		        format: 'json'
		    },
		    dataType: 'jsonp',
			success: function(data){
				console.log(data);
				for (var pageId in data.query.pages) {
					var excerpt = data.query.pages[pageId].extract;
					var newexcerpt = excerpt.split('</p>');
					var articleLink = '<a href="' + data.query.pages[pageId].fullurl + '">View Full Article: "' + data.query.pages[pageId].title + '"</a>';
					$('article').html(newexcerpt[0] + '</p>' + articleLink);
				}			
			}
		});			
		
	}

	$(document).ready(function() {	
			
		getWiki();
		
		$('#button').click(function() {
			getWiki();
		});
		
	});