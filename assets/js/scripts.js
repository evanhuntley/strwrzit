/* ==========================================================================
	Scripts
============================================================================= */	

	// Declare general variables
	var articleWrap = $('.wikipedia');
	var article = $('article');
	var textInput = $('.user-text');
	var scroller = $('#scroll div');
	var buttons = $('#choice button');
	var song = $('#audio');
	var reset = $('#reset');
	var choice = $('#choice');
	var intro = $('.intro');

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
		
		// Call Wikipedia function on click, show article
		$('#wiki-article').click(function() {
		
			textInput.removeClass('active');
			articleWrap.addClass('active');
							
			// Handle button status
			buttons.removeClass('on');
			$(this).addClass('on');
			
		});
		
		// Get Different Wikipedia Article on button click
		$('#new-wiki').click(function() {
			getWiki();
		});
		
		// Show textarea on click
		$('#own-text').click(function() {
		
			articleWrap.removeClass('active');
			textInput.addClass('active');
			
			// Handle button status
			buttons.removeClass('on');
			$(this).addClass('on');
			
		});
		
		// Do the Star Wars Thing
		$('.play-button').click(function() {
			
			// Check which button is on
			if ( $('#wiki-article').hasClass('on') ) {
				var content = article.html();				
			} else {
				var content = '<p>' + textInput.val() + '</p>';
			}
			
			// Put correct content in scroller
			scroller.html(content);
			
			// Hide Choices, Show Intro Text and Scroller
			choice.hide();
			reset.show();
			intro.fadeIn(2000).delay(1000).fadeOut(1000);
			scroller.addClass('go');
			
			// Play the song!
			song.trigger('play');
			
		});
		
		// Reset the whole thing
		$('#reset').click(function() {
			
			// Stop and reset music
			song.trigger('pause');
			song.prop("currentTime", 0);
			
			// Bring back the choice state
			reset.hide();
			intro.hide();
			scroller.removeClass('go');
			articleWrap.removeClass('active');
			textInput.removeClass('active');
			buttons.removeClass('on');
			getWiki();
			choice.fadeIn();
			
		});
		
	});