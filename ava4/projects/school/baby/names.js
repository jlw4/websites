/*
John L Wilson
CSE 154 AL
Assignment #9 "Baby Names"
This is the main javascript file for the baby names website
*/

"use strict";

(function() {
	// populates the drop-down with a list of names, prepares search button
	window.onload = function() {
		getList();
		document.getElementById("search").onclick = search;
	};
	
	// requests and processes a list of all available baby names
	function getList() {
		var ajax = new XMLHttpRequest();
		ajax.onload = populateList;
		ajax.open("GET", "https://webster.cs.washington.edu/cse154/babynames.php?type=list", true);
		ajax.send();
	}
	
	// populates the "allnames" drop-down with all available baby names, enables the drop-down list
	function populateList() {
		var names = this.responseText.split("\n");
		var nameArea = document.getElementById("allnames");
		for (var i = 0; i < names.length; i++) {
			var name = document.createElement("option");
			name.value = names[i];
			name.innerHTML = names[i];
			nameArea.appendChild(name);
		}
		nameArea.disabled = false;
		document.getElementById("loadingnames").style.display = "none";
	}
	
	// starts requests for the meaning, rank data and celeb data if a name is selected
	function search() {
		var name = document.getElementById("allnames").value;
		if (name != "")	{
			if (document.getElementById("genderm").checked) {
				var gender = "m";
			} else {
				var gender = "f";
			}
			loading();
			ajaxRequest(showMeaning, "?type=meaning&name=" + name);
			ajaxRequest(showGraph, "?type=rank&name=" + name + "&gender=" + gender);
			ajaxRequest(showCelebs, "?type=celebs&name=" + name + "&gender=" + gender);
		} else {
			document.getElementById("resultsarea").style.display = "none";
		}
	}

	// removes all content from the resultsarea and displays the loading gifs
	function loading() {
		removeData();
		document.getElementById("loadingmeaning").style.display = "block";
		document.getElementById("loadinggraph").style.display = "block";
		document.getElementById("loadingcelebs").style.display = "block";
		document.getElementById("resultsarea").style.display = "block";
	}

	// standard ajax request function, accepts an onload function and parameters
	function ajaxRequest(onload, params) {
		var ajax = new XMLHttpRequest();
		ajax.onload = onload;
		var request = "https://webster.cs.washington.edu/cse154/babynames.php" + params;
		ajax.open("GET", request, true);
		ajax.send();
	}

	// handles an ajax request. displays the data in the meaning div
	function showMeaning() {
		if (this.status == 200) {
			var meaning = this.responseText;
			document.getElementById("loadingmeaning").style.display = "none";
			document.getElementById("meaning").innerHTML = meaning;
		} else {
			handleError(this);
		}
	}

	// handles an ajax request. displays a graph of the data in the graph div
	function showGraph() {
		var graph = document.getElementById("graph");
		document.getElementById("loadinggraph").style.display = "none";
		if (this.status == 200) {
			var data = this.responseXML.querySelectorAll("rank");
			var tr = document.createElement("tr");
			for (var i = 0; i < data.length; i++) {
				var th = document.createElement("th");
				th.innerHTML = data[i].getAttribute("year");
				tr.appendChild(th);
			}
			graph.appendChild(tr);
			tr = document.createElement("tr");
			for (var i = 0; i < data.length; i++) {
				var td = document.createElement("td");
				var div = document.createElement("div");
				var rank = parseInt(data[i].textContent);
				div.innerHTML = rank;
				if (rank != 0) {
					div.style.height = parseInt((1000 - rank) / 4) + "px";
					if (rank < 10) {
						div.classList.add("red");
					}
				} else {
					div.style.height = 0;
				}
				td.appendChild(div);
				tr.appendChild(td);
			}
			graph.appendChild(tr);
		} else if (this.status == 410) {
			document.getElementById("norankdata").style.display = "block";
		} else {
			handleError(this);
		}
	}

	// handles an ajax request. displays celebrities with the same first name
	function showCelebs() {
		if (this.status == 200) {
			var actors = JSON.parse(this.responseText).actors;
			var celebList = document.getElementById("celebs");
			document.getElementById("loadingcelebs").style.display = "none";
			for (var i = 0; i < actors.length; i++) {
				var li = document.createElement("li");
				var first = actors[i].firstName;
				var last = actors[i].lastName;
				var count = actors[i].filmCount;
				li.innerHTML = first + " " + last + " (" + count + " films)";
				celebList.appendChild(li);
			}
		} else {
			handleError(this);
		}
	}

	// handles an ajax error. Shows the number and type of the error.
	function handleError(error) {
		removeData();
		document.getElementById("resultsarea").style.display = "none";
		var p = document.createElement("p");
		p.innerHTML = "Error " + error.status + " " + error.statusText + ", try again.";
		document.getElementById("errors").appendChild(p);
	}

	// clears data from the results area, hides error messages.
	function removeData() {
		document.getElementById("norankdata").style.display = "none";
		document.getElementById("meaning").innerHTML = "";
		document.getElementById("errors").innerHTML = "";
		var table = document.getElementById("graph");
		while (table.hasChildNodes()) {
			table.removeChild(table.lastChild);
		}
		var celebList = document.getElementById("celebs");
		while (celebList.hasChildNodes()) {
			celebList.removeChild(celebList.lastChild);
		}
	}
})();