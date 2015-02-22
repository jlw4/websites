<!--
John L Wilson
CSE 154 AL
Homework 6 "One Degree of Kevin Bacon"

This page displays a table of all the films a given actor has been in with Kevin Bacon, for the
One Degree of Kevin Bacon website
-->

<?php
include("common.php");
top();
$firstname = $_GET["firstname"];
$lastname = $_GET["lastname"];
$name = $firstname." ".$lastname;
$id = id($firstname, $lastname);
if (isset($id)) {
	?> <h1>Results for <?= $firstname ?> <?= $lastname ?> </h1>
	<?php
	$query = "SELECT name, year
			  FROM movies m
			  JOIN roles r1 ON r1.movie_id = id
			  JOIN roles r2 ON r2.movie_id = id
			  JOIN actors a1 ON r1.actor_id = a1.id
			  JOIN actors a2 ON r2.actor_id = a2.id
			  WHERE a1.first_name = 'Kevin'
			  AND a1.last_name = 'Bacon'
			  AND a2.id = '{$id}'
			  ORDER BY year DESC";
	$rows = search_imdb($query);
	print_table($rows, "Films with {$name} and Kevin Bacon");
} else {
	?> <p> <?= $name ?> wasn't in any films with Kevin Bacon. </p> <?php
}
bottom();
?>
