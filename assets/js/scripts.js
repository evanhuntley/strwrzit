/* ==========================================================================
	Scripts
============================================================================= */	

	// Declare general variables
	var article = $('article');
	var textInput = $('textarea');
	var scroller = $('#scroll div');
	var buttons = $('#choice button');
	var play = $('#play');
	var song = $('#audio');

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
					article.html(newexcerpt[0] + '</p>' + articleLink);
				}			
			}
		});			
		
	}

	// Document Ready
	$(document).ready(function() {	
		
		// Call Wikipedia function on refresh	
		getWiki();
		
		// Declare variable for # of Wikipedia clicks
		var clicks = 0;
		
		// Call Wikipedia function on click, show article
		$('#wikipedia').click(function() {
		
			textInput.removeClass('active');
			
			// Just show article if first click, otherwise make ajax call
			if (clicks == 0) {
				$('#wikipedia').html('Get a different article');
			} else {
				getWiki();
			}
			clicks++;
			
			article.addClass('active');
							
			// Handle button status
			buttons.removeClass('on');
			$(this).addClass('on');
			
			// Show Play button
			play.show();
			
		});
		
		// Show textarea on click
		$('#own-text').click(function() {
			article.removeClass('active');
			$('#wikipedia').html('Random Wikipedia entry');
			textInput.addClass('active');
			
			// Prevent need for additional AJAX call if user toggles between options
			clicks = 0;
			
			// Handle button status
			buttons.removeClass('on');
			$(this).addClass('on');
			
			// Show Play button
			play.show();
			
		});
		
		$('#play-button').click(function() {
			
			// Check which button is on
			if ( $('#wikipedia').hasClass('on') ) {
				var content = article.html();				
			} else {
				var content = '<p>' + textInput.val() + '</p>';
			}
			
			// Put correct content in scroller
			scroller.html(content);
			
			// Hide Choices
			$('#choice').hide();
			
			// Show Intro Text
			$('.intro').fadeIn(1000).delay(3000).fadeOut(1000);
			
			// Show Scroller
			scroller.addClass('go');
			
			song[0].currentTime = 4;
			song[0].play();
			
		});
		
	});