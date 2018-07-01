var mp_version      = 'mp_plugin_v1.3';

function setupMusicPlayer(musicPlayerDivID, audioFileName)
{
	$(document).ready(function()
	{
		
		var musicPlayerHTML = '';
		
		$('#'+musicPlayerDivID).addClass("row border");

		musicPlayerHTML = musicPlayerHTML + '	<audio id="musicPlayerControls">\n';
		musicPlayerHTML = musicPlayerHTML + '		<source src="'+mp_version+'/mp_audio_files/'+audioFileName+'" type="audio/mpeg">\n';
		musicPlayerHTML = musicPlayerHTML + '		Your browser does not support the audio element.\n';
		musicPlayerHTML = musicPlayerHTML + '	</audio>\n';
		musicPlayerHTML = musicPlayerHTML + '	<!-- Row: Music Player Buttons -->\n';
		musicPlayerHTML = musicPlayerHTML + '	<div class="col-2 col-sm-2 d-flex justify-content-center align-self-center p-2 bg-light">\n';
		musicPlayerHTML = musicPlayerHTML + '		<i id="musicPlayerButton" class="material-icons btn">play_circle_outline</i>\n';
		musicPlayerHTML = musicPlayerHTML + '	</div>\n';
		musicPlayerHTML = musicPlayerHTML + '	<!-- Row: Music Player Info -->\n';
		musicPlayerHTML = musicPlayerHTML + '	<div id="musicPlayerInfo" class="col-10 col-sm-10 p-2 bg-light">\n';
		musicPlayerHTML = musicPlayerHTML + '		<div class="row m-1 bg-dark">\n';
		musicPlayerHTML = musicPlayerHTML + '			<div class="col-10 col-sm-10 text-white">\n';
		musicPlayerHTML = musicPlayerHTML + '				<span id="songName">'+audioFileName+'</span>\n';
		musicPlayerHTML = musicPlayerHTML + '			</div>\n';
		musicPlayerHTML = musicPlayerHTML + '			<div class="col-2 col-sm-2">\n';
		musicPlayerHTML = musicPlayerHTML + '				<img id="audio_eq_icon" src="'+mp_version+'/mp_icons/audio_eq_pause.png" class="img-fluid" alt="Eq Icon">\n';
		musicPlayerHTML = musicPlayerHTML + '			</div>\n';
		musicPlayerHTML = musicPlayerHTML + '		</div>\n';
		musicPlayerHTML = musicPlayerHTML + '	</div>\n';
		
		$('#'+musicPlayerDivID).html(musicPlayerHTML);
		
		$('#musicPlayerButton').click(musicPlayerButtonPressed);	
	});
}

function getEqIcon()
{
	return $('#audio_eq_icon');
}

function startEqIconAnimation()
{
	var eqIcon = getEqIcon();
	eqIcon.attr("src",mp_version+"/mp_icons/audio_eq_play.gif");
}

function stopEqIconAnimation()
{
	var eqIcon = getEqIcon();
	eqIcon.attr("src",mp_version+"/mp_icons/audio_eq_pause.png");
}

function getMusicPlayerControls()
{
	return $('#musicPlayerControls')[0];
}

function getMusicPlayerButton()
{
	return $('#musicPlayerButton');
}

function playAudio()
{
	var musicPlayerControls = getMusicPlayerControls();
	musicPlayerControls.play();
}

function pauseAudio()
{
	var musicPlayerControls = getMusicPlayerControls();
	musicPlayerControls.pause();
}

function audioIsPaused()
{
	var musicPlayerControls = getMusicPlayerControls();
	return musicPlayerControls.paused;
}

function getPlayButtonHTML()
{
	return "play_circle_outline";
}

function getPauseButtonHTML()
{
	return "pause_circle_outline";
}

function getMusicPlayerButtonHTML()
{
	var musicPlayerButton = getMusicPlayerButton();
	return musicPlayerButton.html();
}

function setPlayButton()
{
	var musicPlayerButton = getMusicPlayerButton();
	var playButtonHTML    = getPlayButtonHTML();

	musicPlayerButton.html(playButtonHTML);
}

function setPauseButton()
{
	var musicPlayerButton = getMusicPlayerButton();
	var pauseButtonHTML   = getPauseButtonHTML();

	musicPlayerButton.html(pauseButtonHTML);
}

function musicPlayerButtonPressed()
{
	if (audioIsPaused())
	{
		setPauseButton();
		playAudio();
		startEqIconAnimation();
	}
	else
	{
		setPlayButton();
		pauseAudio();
		stopEqIconAnimation();
	}
}
