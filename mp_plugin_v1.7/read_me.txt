//DEMO

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<!-- > Style Sheets -->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<!-- < Style Sheets -->

	<!-- > Javascript Files -->
		<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>

		<script src="mp_plugin/mp_javascript/music_player_js.js"></script>
	<!-- < Javascript Files -->

	<title>Music Player Demo</title>
</head>

<body onload="setupMusicPlayer('musicPlayer', 'new_flesh.mp3');">
	<div class="container-fluid">
	
		<!-- Row: Music Player -->
		<div id="musicPlayer">
		</div>
	
	</div>
</body>

</html>
