<?
	require_once('inc.constants.php');
	require_once('inc.connectDB.php');
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Hyper Ball &mdash; Highscores</title>
		<link rel="author" href="http://ba573.de">
		<script src="js/prefix.js"></script>
		<link rel="stylesheet" href="hyper.css" type="text/css">
		<link href='http://fonts.googleapis.com/css?family=Press+Start+2P' rel='stylesheet' type='text/css'>
	</head>
	<body class="highscores">
		<section id="highscores">
			<img class="logo" src="img/logo.svg" alt="Hyper Ball">
			<h1>Highscores</h1>
			<table>
			<?	$sql = "SELECT ID, Name, Date, Score FROM hb_scores ORDER BY Score DESC";
				$result = $conn->query($sql);
				if ($result->num_rows > 0) {
				    $rank = 1;
				    while($row = $result->fetch_assoc()) {
				        $score = str_pad ( $row["Score"], 6, "0", STR_PAD_LEFT);?>
				        	<tr<?
					        	if($_GET["id"] && $_GET["id"] == $row["ID"]){
						        	echo ' class="newScore"';
					        	}
						        ?>>
					        	<td><? echo $rank;	?>.</td>
								<td><? echo $row["Name"]; ?></td>
								<td><? echo $score; ?> Pts</td>
<!-- 								<td><? echo $row["Date"]; ?></td> -->
							</tr>
						<? $rank++;
					}
				} else {
				    echo "<p>Sorry. Nobody played this stupid game yet. So there are no highscores.";
				}
				$conn->close();	
			?>	
			</table>
		</section>
		<aside id="playWrapper">
			<a class="blink" id="play" href="index.html">» Press to Play</a>
		</aside>
	</body>
</html>
