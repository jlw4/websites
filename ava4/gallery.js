$(function() {

$("#slideshow1 > div:gt(0)").hide();

setInterval(function() { 
	$('#slideshow1 > div:first')
		.fadeOut(1000)
		.next()
		.css({ "position":"absolute" })
		.fadeIn(1000)
		.end()
		.appendTo('#slideshow1');
	},  3000);

$("#slideshow2 > div:gt(0)").hide();

setInterval(function() { 
	$('#slideshow2 > div:first')
		.fadeOut(1000)
		.next()
		.css({ "position":"absolute" })
		.fadeIn(1000)
		.end()
		.appendTo('#slideshow2');
	},  3000);

});