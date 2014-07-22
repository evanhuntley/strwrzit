
	$(document).ready(function() {	
		
		$.ajax({
		    url: 'http://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json',
		    data: {
		        format: 'json'
		    },
		    dataType: 'jsonp',
			success: function(data){
				console.log(data);
				for (var pageId in data.query.pages) {
					var excerpt = data.query.pages[pageId].extract;
					var newexcerpt = excerpt.split('</p>');
					console.log(newexcerpt[0] + '</p>');
				}			
			}
		});		
		
	});