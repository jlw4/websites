/*
John L Wilson
CSE 154 AL
Homework 7 "ASCIImation"

This is one of the javascript files for the ASCIImation website

*/

"use strict";

(function() {
	var timer = null;
	var speed = 250;
	var animationString;
	var animation;
	var frame = 0;
	var started = false;

	window.onload = function() {
		animation = ANIMATIONS["Blank"];
		
		var startbutton = document.getElementById("start");
		startbutton.onclick = start;
		
		var stopbutton = document.getElementById("stop");
		stopbutton.disabled = true;
		stopbutton.onclick = stop;

		var sizemenu = document.getElementById("size");
		sizemenu.onchange = setsize;

		var animationmenu = document.getElementById("animation");
		animationmenu.onchange = setanimation;
		
		var speedcontrol = document.getElementById("speed");
		speedcontrol.onclick = setspeed;
	};
	
	// sets the speed of the animation based on the radio button values
	// if the animation is going, it resets the speed and continues animating
	function setspeed() {
		var speeds = [50, 250, 1500];
		var speedmenu = document.getElementsByName("speed");
		for (var i = 0; i < speeds.length; i++) {
			if (speedmenu[i].checked) {
				speed = speeds[i];
			}
		}
		if (started) {
			clearInterval(timer);
			timer = setInterval(tick, speed);
		}
	}
	
	// starts the animation
	function start() {
		started = true;
		document.getElementById("animation").disabled = true;
		document.getElementById("stop").disabled = false;
		document.getElementById("start").disabled = true;
		var textarea = document.getElementsByTagName("textarea")[0];
		animationString = textarea.value;
		animation = animationString.split("=====\n");
		textarea.value = animation[0];
		timer = setInterval(tick, speed);
	}
	
	// stops the animation
	function stop() {
		started = false;
		document.getElementById("animation").disabled = false;
		document.getElementById("stop").disabled = true;
		document.getElementById("start").disabled = false;
		clearInterval(timer);
		var textarea = document.getElementsByTagName("textarea")[0];
		textarea.value = animationString;
		frame = 0;
	}
	
	// sets the animation based on the given value in the drop-down menu
	function setanimation() {
		var textarea = document.getElementsByTagName("textarea")[0];
		var animationmenu = document.getElementById("animation");
		animationString = ANIMATIONS[animationmenu.value];
		textarea.value = animationString;
	}
	
	// progresses the animation forward one frame
	function tick() {
		var textarea = document.getElementsByTagName("textarea")[0];
		frame++;
		if (frame >= animation.length) {
			frame = 0;
		}
		textarea.value = animation[frame];
	}
	
	// sets the font size of the animation
	function setsize() {
		var fontsizes = ["7pt", "10pt", "12pt", "16pt", "24pt", "32pt"];
		var textarea = document.getElementsByTagName("textarea")[0];
		var sizemenu = document.getElementById("size");
		var size = sizemenu.value;
		textarea.style.fontSize = fontsizes[size];
	}
})();