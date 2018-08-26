var g_musicPlayerVersion = 'mp_plugin_v1.92';
var g_songName = 'xx_song_name_xx.mp3';

function setupMusicPlayer(songName)
{
	g_songName = songName;

	$(document).ready(function()
	{
		setMusicPlayerHTML();
		setMusicPlayerButtonAction();
		setMusicPlayerOnEndedAction();
	});
}

//--> GET functions
function getEqIcon()
{
	return $('#XX_audioEqIcon');
}

function getMusicPlayerContainer()
{
	return $('#musicPlayer');
}

function getMusicPlayer()
{
	return $('#XX_musicPlayer');
}

function getMusicPlayerControls()
{
	var musicPlayer = getMusicPlayer();

	return musicPlayer[0];
}

function getMusicPlayerButton()
{
	return $('#XX_musicPlayerButton');
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

function getMusicPlayerHTML()
{
	var musicPlayerHTML = '';

	musicPlayerHTML = musicPlayerHTML + '	<audio id="XX_musicPlayer">\n';
	musicPlayerHTML = musicPlayerHTML + '		<source src="'+g_musicPlayerVersion+'/mp_audio_files/song.mp3" type="audio/mpeg">\n';
	musicPlayerHTML = musicPlayerHTML + '		Your browser does not support the audio element.\n';
	musicPlayerHTML = musicPlayerHTML + '	</audio>\n';
	musicPlayerHTML = musicPlayerHTML + '	<!-- Row: Music Player Buttons -->\n';
	musicPlayerHTML = musicPlayerHTML + '	<div class="col-2 col-sm-2 d-flex justify-content-center align-self-center p-2">\n';
	musicPlayerHTML = musicPlayerHTML + '		<i id="XX_musicPlayerButton" class="material-icons btn">play_circle_outline</i>\n';
	musicPlayerHTML = musicPlayerHTML + '	</div>\n';
	musicPlayerHTML = musicPlayerHTML + '	<!-- Row: Music Player Info -->\n';
	musicPlayerHTML = musicPlayerHTML + '	<div class="col-10 col-sm-10 p-2">\n';
	musicPlayerHTML = musicPlayerHTML + '		<div class="row m-1 my-3 bg-dark">\n';
	musicPlayerHTML = musicPlayerHTML + '			<div class="col-8 col-sm-8 text-white">\n';
	musicPlayerHTML = musicPlayerHTML + '				<span>'+g_songName+'</span>\n';
	musicPlayerHTML = musicPlayerHTML + '			</div>\n';
	musicPlayerHTML = musicPlayerHTML + '			<div class="col-4 col-sm-4">\n';
	musicPlayerHTML = musicPlayerHTML + '				<img id="XX_audioEqIcon" src="'+g_musicPlayerVersion+'/mp_icons/audio_eq_pause.png" class="img-fluid float-right mt-2" alt="Eq Icon">\n';
	musicPlayerHTML = musicPlayerHTML + '			</div>\n';
	musicPlayerHTML = musicPlayerHTML + '		</div>\n';
	musicPlayerHTML = musicPlayerHTML + '	</div>\n';

	return musicPlayerHTML;
}
//--< GET functions

//--> SET functions
function setMusicPlayerHTML()
{
	var musicPlayerContainer = getMusicPlayerContainer();
	var musicPlayerHTML      = getMusicPlayerHTML();
	
	musicPlayerContainer.addClass("row border rounded bg-light");
	musicPlayerContainer.html(musicPlayerHTML);
}

function setMusicPlayerButtonAction()
{
	var musicPlayerButton = getMusicPlayerButton();

	musicPlayerButton.click(musicPlayerButtonPressed);
}

function setMusicPlayerOnEndedAction()
{
	var musicPlayer = getMusicPlayer();

	musicPlayer.on('ended', function(){
		setPlayButton();
		pauseAudio();	
		stopEqIconAnimation();
	});
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
//--< SET functions

//--> ACTION functions
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
//--< ACTION functions