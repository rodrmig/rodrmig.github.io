var g_musicPlayerVersion = 'mp_plugin_v1.97';
var g_songName = 'xx_song_name_xx.mp3';
var g_artistName = 'xx_artist_xx';

function setupMusicPlayer(songName, artistName)
{
	g_songName = songName;
	g_artistName = artistName;
	
	$(document).ready(function()
	{
		setMusicPlayerHTML();
		setMusicPlayerButtonAction();
		setMusicPlayerOnPauseAction();
		setMusicPlayerOnPlayAction();
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
	return '<i class="fa fa-play" style="color:#00d820"></i>';
}

function getPauseButtonHTML()
{
	return '<i class="fa fa-pause" style="color:#4f4f4f"></i>';
}

function getMusicPlayerHTML()
{
	var musicPlayerHTML = '';

	musicPlayerHTML = musicPlayerHTML + '	<audio id="XX_musicPlayer">\n';
	musicPlayerHTML = musicPlayerHTML + '		<source src="'+g_musicPlayerVersion+'/mp_audio_files/song.mp3" type="audio/mpeg">\n';
	musicPlayerHTML = musicPlayerHTML + '		Your browser does not support the audio element.\n';
	musicPlayerHTML = musicPlayerHTML + '	</audio>\n';

	musicPlayerHTML = musicPlayerHTML + '	<!-- Row: Music Player Buttons -->\n';
	musicPlayerHTML = musicPlayerHTML + '	<div class="col-2 col-sm-2 d-flex justify-content-center align-self-center p-0">\n';
	musicPlayerHTML = musicPlayerHTML + '		<button id="XX_musicPlayerButton" class="btn border border-secondary mr-1 btn-block rounded" style="font-size:25px">'+getPlayButtonHTML()+'</button>\n';
	musicPlayerHTML = musicPlayerHTML + '	</div>\n';

	musicPlayerHTML = musicPlayerHTML + '	<!-- Row: Music Player Info -->\n';
	musicPlayerHTML = musicPlayerHTML + '	<div class="col-10 col-sm-10">\n';
	musicPlayerHTML = musicPlayerHTML + '		<div class="row bg-dark rounded">\n';
	musicPlayerHTML = musicPlayerHTML + '			<div class="col-8 col-sm-8 text-white">\n';
	musicPlayerHTML = musicPlayerHTML + '				<span>'+g_songName+'</span><br>\n';
	musicPlayerHTML = musicPlayerHTML + '				<span>'+g_artistName+'</span>\n';
	musicPlayerHTML = musicPlayerHTML + '			</div>\n';
	musicPlayerHTML = musicPlayerHTML + '			<div class="col-4 col-sm-4">\n';
	
	musicPlayerHTML = musicPlayerHTML + '				<span>&nbsp;</span><br>\n';
	

	musicPlayerHTML = musicPlayerHTML + '				<span class="ml-2 float-right"><img id="XX_audioEqIcon" src="'+g_musicPlayerVersion+'/mp_icons/audio_eq_pause.png" class="img-fluid" alt="Eq Icon"></span>\n';
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
	
	musicPlayerContainer.addClass("row border border-dark p-2");
	musicPlayerContainer.html(musicPlayerHTML);
	musicPlayerContainer.css("background-image","linear-gradient(#ffffff, #cdcdcd,#969696)");
	getMusicPlayerButton().css("background-image","linear-gradient(#ffffff, #cdcdcd,#969696)");
}

function setMusicPlayerButtonAction()
{
	var musicPlayerButton = getMusicPlayerButton();

	musicPlayerButton.click(musicPlayerButtonPressed);
}

function setMusicPlayerOnPauseAction()
{
	var musicPlayer = getMusicPlayer();

	musicPlayer.on('pause', function(){
		setPlayButton();
		stopEqIconAnimation();
	});
}

function setMusicPlayerOnPlayAction()
{
	var musicPlayer = getMusicPlayer();

	musicPlayer.on('play', function(){
		setPauseButton();
		startEqIconAnimation();
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
		playAudio();	
	}
	else
	{
		pauseAudio();	
	}
}
//--< ACTION functions