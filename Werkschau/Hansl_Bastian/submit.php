<?
if($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['name'] != "" && $_POST['score'] != ""){
	require_once('inc.constants.php');
	require_once('inc.connectDB.php');
	$name  = $conn->escape_string($_POST['name']);
	$score = $conn->escape_string($_POST['score']);
	$sql = 
		"INSERT INTO hb_scores (Name, Score)
		VALUES ('$name', '$score')";
	
	if ($conn->query($sql) === TRUE) {
	    $last_id = $conn->insert_id;
	    header('Location: highscores.php?id='.$last_id);
	} 
	$conn->close();
	
}
else {
	die(header('Location: highscores.php'));
}
?>