var g_musicPlayerVersion      = 'mp_plugin_v1.7';

function setupMusicPlayer(musicPlayerDivID, audioFileName)
{
	$(document).ready(function()
	{
		var musicPlayerHTML = '';
		
		$('#'+musicPlayerDivID).addClass("row border");

		musicPlayerHTML = musicPlayerHTML + '	<audio id="XX_musicPlayer">\n';
		musicPlayerHTML = musicPlayerHTML + '		<source src="'+g_musicPlayerVersion+'/mp_audio_files/'+audioFileName+'" type="audio/mpeg">\n';
		musicPlayerHTML = musicPlayerHTML + '		Your browser does not support the audio element.\n';
		musicPlayerHTML = musicPlayerHTML + '	</audio>\n';
		musicPlayerHTML = musicPlayerHTML + '	<!-- Row: Music Player Buttons -->\n';
		musicPlayerHTML = musicPlayerHTML + '	<div class="col-2 col-sm-2 d-flex justify-content-center align-self-center p-2 bg-light">\n';
		musicPlayerHTML = musicPlayerHTML + '		<i id="XX_musicPlayerButton" class="material-icons btn">play_circle_outline</i>\n';
		musicPlayerHTML = musicPlayerHTML + '	</div>\n';
		musicPlayerHTML = musicPlayerHTML + '	<!-- Row: Music Player Info -->\n';
		musicPlayerHTML = musicPlayerHTML + '	<div class="col-10 col-sm-10 p-2 bg-light">\n';
		musicPlayerHTML = musicPlayerHTML + '		<div class="row m-1 bg-dark">\n';
		musicPlayerHTML = musicPlayerHTML + '			<div class="col-10 col-sm-10 text-white">\n';
		musicPlayerHTML = musicPlayerHTML + '				<span>'+audioFileName+'</span>\n';
		musicPlayerHTML = musicPlayerHTML + '			</div>\n';
		musicPlayerHTML = musicPlayerHTML + '			<div class="col-2 col-sm-2">\n';
		musicPlayerHTML = musicPlayerHTML + '				<img id="XX_audioEqIcon" src="'+g_musicPlayerVersion+'/mp_icons/audio_eq_pause.png" class="img-fluid" alt="Eq Icon">\n';
		musicPlayerHTML = musicPlayerHTML + '			</div>\n';
		musicPlayerHTML = musicPlayerHTML + '		</div>\n';
		musicPlayerHTML = musicPlayerHTML + '	</div>\n';
		
		$('#'+musicPlayerDivID).html(musicPlayerHTML);
		
		$('#XX_musicPlayerButton').click(musicPlayerButtonPressed);
		$('#XX_musicPlayer').on('ended', pauseAudio);
	});
}

function getEqIcon()
{
	return $('#XX_audioEqIcon');
}

function startEqIconAnimation()
{
	var eqIcon = getEqIcon();

	eqIcon.attr("src", g_musicPlayerVersion+"/mp_icons/audio_eq_play.gif");
}

function stopEqIconAnimation()
{
	var eqIcon = getEqIcon();

	eqIcon.attr("src", g_musicPlayerVersion+"/mp_icons/audio_eq_pause.png");
}

function getMusicPlayer()
{
	return $('#XX_musicPlayer')[0];
}

function getMusicPlayerButton()
{
	return $('#XX_musicPlayerButton');
}

function playAudio()
{
	var musicPlayer = getMusicPlayer();

	setPauseButton();
	musicPlayer.play();
	startEqIconAnimation();
}

function pauseAudio()
{
	var musicPlayer = getMusicPlayer();

	setPlayButton();
	musicPlayer.pause();
	stopEqIconAnimation();
}

function audioIsPaused()
{
	var musicPlayer = getMusicPlayer();

	return musicPlayer.paused;
}

function getPlayButtonHTML()
{
	return "play_circle_outline";
}

function getPauseButtonHTML()
{
	return "pause_circle_outline";
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
		playAudio();	
	}
	else
	{
		pauseAudio();	
	}
}