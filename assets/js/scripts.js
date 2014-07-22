
	$(document).ready(function() {
		
		
		$.ajax({
		    url: 'http://en.wikipedia.org/w/api.php?action=query&format=json&prop=langlinks&lllimit=500&titles=kaas',
		    data: {
		        format: 'json'
		    },
		    dataType: 'jsonp',
			success: function( jsonObject ){
				console.log( jsonObject );
			}
		});		
		
	
	});