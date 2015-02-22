/*
John L Wilson
CSE 154 AL
Homework 8 "Fifteen Puzzle"

Javascript file for the fifteen puzzle website

*/

(function() {
	"use strict";

	window.onload = function() {
		placeTiles();
		document.getElementById("shufflebutton").onclick = shuffle;
		document.getElementById("numbers").onclick = numbers;
	};
	
	function numbers() {
		for (var i = 1; i <= 15; i++) {
			document.getElementById(i).classList.toggle("clear");
		}
	}
	
	// places 16 tiles in the puzzle area, the first 15 using background.jpg, the 16th blank
	function placeTiles() {
		var i = 1;
		for (var t = 0; t < 400; t += 100) {
			for (var left = 0; left < 400; left += 100) {
				var tile = document.createElement("div");
				tile.className = "tile";
				document.getElementById("puzzlearea").appendChild(tile);
				tile.style.top = t + "px";
				tile.style.left = left + "px";
				var position = " -" + left + "px -" + t + "px";
				tile.style.backgroundPosition = position;
				tile.id = i;
				if (i == 16) {
					tile.classList.add("blank");
				} else {
					tile.innerHTML = i;
					tile.onclick = click;
					tile.onmouseover = on;
					tile.onmouseout = off;
					tile.classList.add("clear");
				}
				i++;
			}
		}
	}
	
	// returns an array of all neighbors of the given tile
	function getNeighbors(tile) {
		var neighbors = [];
		for (var i = 1; i <= 16; i++) {
			var other = document.getElementById(i);
			if (isNeighbors(tile, other)) {
				neighbors.push(other);
			}
			if (neighbors.length == 4) {
				return neighbors;
			}
		}
		return neighbors;
	}
	
	// returns true if the given tiles are neighbors
	function isNeighbors(tile1, tile2) {
		var left1 = parseInt(window.getComputedStyle(tile1).left);
		var top1 = parseInt(window.getComputedStyle(tile1).top);
		var left2 = parseInt(window.getComputedStyle(tile2).left);
		var top2 = parseInt(window.getComputedStyle(tile2).top);
		if (Math.abs(left1 + top1 - left2 - top2) == 100) {
			return true;
		} else {
			return false;
		}
	}
	
	// switches the location of the given tile1 and tile2
	function move(tile1, tile2) {
		var left1 = window.getComputedStyle(tile1).left;
		var top1 = window.getComputedStyle(tile1).top;
		var left2 = window.getComputedStyle(tile2).left;
		var top2 = window.getComputedStyle(tile2).top;
		tile1.style.top = top2;
		tile1.style.left = left2;
		tile2.style.top = top1;
		tile2.style.left = left1;
	}
	
	// moves the event tile if it is neighbors with the blank tile
	function click(event) {
		var blank = document.getElementById("16");
		if (isNeighbors(this, blank)) {
			move(this, blank);
		}
	}
	
	// adds class "on" to event object
	function on(event) {
		var blank = document.getElementById("16");
		if (isNeighbors(this, blank)) {
			this.classList.add("on");
		}
	}
	
	// removes class "on" from event object
	function off(event) {
		this.classList.remove("on");
	}
	
	// shuffles the board by moving a random neighbor of the blank tile 1000 times.
	function shuffle() {
		var d = new Date();
		var start = d.getTime();
		var blank = document.getElementById("16");
		for (var i = 0; i < 1000; i++) {
			var neighbors = getNeighbors(blank);
			var neighbor = neighbors[parseInt(Math.random() * neighbors.length)];
			move(blank, neighbor);
		}
	}
})();
