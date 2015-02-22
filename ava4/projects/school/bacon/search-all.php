<!--
John L Wilson
CSE 154 AL
Homework 6 "One Degree of Kevin Bacon"

This page displays a table of all the films a given actor has been in, for the
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
	$query = "SELECT name, m.year
			  FROM roles r
			  JOIN actors a ON r.actor_id = a.id
			  JOIN movies m ON r.movie_id = m.id
			  WHERE a.id = '{$id}'
			  ORDER BY year DESC";
	$rows = search_imdb($query);
	print_table($rows, "All Films");
} else {
	?> <p> Actor <?= $name ?> not found. </p> <?php
}
bottom();
?>
