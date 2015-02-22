<!--
John L Wilson
CSE 154 AL
Homework 6 "One Degree of Kevin Bacon"

This file contains all of the common php and html for the various pages of the
One Degree of Kevin Bacon website
-->

<?php
// Searches the imbd actors database for actors with lastnames matching the given $lastname and
// first names starting with the given $firstname. Returns the id found with the highest
// film_count. Ties are broken by the lowest id number.
function id($firstname, $lastname) {
	$query = "SELECT id
			  FROM actors
			  WHERE last_name = '{$lastname}' AND
			  first_name LIKE '{$firstname}%'
			  ORDER BY film_count DESC, id ASC
			  LIMIT 1";
	$rows = search_imdb($query);
	foreach ($rows as $row) {
		return $row["id"];
	}
}

// Searches the imdb database using the given query, returns a PDO object of the results
function search_imdb($query) {
	$db = new PDO("mysql:dbname=imdb;host=localhost", "johnleew", "XdnkyQhS5LyfH");
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $db->query($query);
}

// produces a table from the given PDO object
function print_table($rows, $caption) {
	?> <table>
		<caption> <?= $caption ?> </caption>
		<tr>
			<th> # </th>
			<th> Title </th>
			<th> Year </th>
		</tr>
		<?php 
		$i = 1;
		foreach ($rows as $row) {
			?> <tr>
				<td> <?= $i ?> </td>
				<td> <?= $row["name"] ?> </td>
				<td> <?= $row["year"] ?> </td>
			</tr> <?php
			$i++;
		}
	?> </table> <?php
}

// produces the top section of common html
function top() {
	?> <!DOCTYPE html>
	<html>
		<head>
			<title>My Movie Database (MyMDb)</title>
			<meta charset="utf-8" />
			
			<!-- Links to provided files.  Do not edit or remove these links -->
			<link href="https://webster.cs.washington.edu/images/kevinbacon/favicon.png" type="image/png" rel="shortcut icon" />
			<script src="https://webster.cs.washington.edu/js/kevinbacon/provided.js" type="text/javascript"></script>

			<!-- Link to your CSS file that you should edit -->
			<link href="bacon.css" type="text/css" rel="stylesheet" />
		</head>

		<body>
			<div id="frame">
				<div id="banner">
					<a href="index.php"><img src="https://webster.cs.washington.edu/images/kevinbacon/mymdb.png" alt="banner logo" /></a>
					My Movie Database
				</div>
				
				<div id="main"> <?php
}

// produces the bottom section of common html
function bottom() {
	?> <!-- form to search for every movie by a given actor -->
				<form action="search-all.php" method="get">
					<fieldset>
						<legend>All movies</legend>
						<div>
							<input name="firstname" type="text" size="12" placeholder="first name" autofocus="autofocus" /> 
							<input name="lastname" type="text" size="12" placeholder="last name" /> 
							<input type="submit" value="go" />
						</div>
					</fieldset>
				</form>

				<!-- form to search for movies where a given actor was with Kevin Bacon -->
				<form action="search-kevin.php" method="get">
					<fieldset>
						<legend>Movies with Kevin Bacon</legend>
						<div>
							<input name="firstname" type="text" size="12" placeholder="first name" /> 
							<input name="lastname" type="text" size="12" placeholder="last name" /> 
							<input type="submit" value="go" />
						</div>
					</fieldset>
				</form>
			</div> <!-- end of #main div -->

			<div id="w3c">
				<a href="https://webster.cs.washington.edu/validate-html.php"><img src="https://webster.cs.washington.edu/images/w3c-html.png" alt="Valid HTML5" /></a>
				<a href="https://webster.cs.washington.edu/validate-css.php"><img src="https://webster.cs.washington.edu/images/w3c-css.png" alt="Valid CSS" /></a>
			</div>
		</div> <!-- end of #frame div -->
	</body>
</html> <?php
}
?>
