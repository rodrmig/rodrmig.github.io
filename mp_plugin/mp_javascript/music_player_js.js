function setupMusicPlayer(musicPlayerDivID, audioFileName)
{
	$(document).ready(function()
	{
		
		var musicPlayerHTML = '';
		
		$('#'+musicPlayerDivID).addClass("row border");

		musicPlayerHTML = musicPlayerHTML + '	<audio id="musicPlayerControls">\n';
		musicPlayerHTML = musicPlayerHTML + '		<source src="mp_plugin/mp_audio_files/'+audioFileName+'" type="audio/mpeg">\n';
		musicPlayerHTML = musicPlayerHTML + '		Your browser does not support the audio element.\n';
		musicPlayerHTML = musicPlayerHTML + '	</audio>\n';
		musicPlayerHTML = musicPlayerHTML + '	<!-- Row: Music Player Buttons -->\n';
		musicPlayerHTML = musicPlayerHTML + '	<div class="col-2 col-sm-2 d-flex justify-content-center align-self-center p-2 bg-light">\n';
		musicPlayerHTML = musicPlayerHTML + '		<i id="musicPlayerButton" class="material-icons">play_circle_outline</i>\n';
		musicPlayerHTML = musicPlayerHTML + '	</div>\n';
		musicPlayerHTML = musicPlayerHTML + '	<!-- Row: Music Player Info -->\n';
		musicPlayerHTML = musicPlayerHTML + '	<div id="musicPlayerInfo" class="col-10 col-sm-10 p-2 bg-light">\n';
		musicPlayerHTML = musicPlayerHTML + '		<div class="row mx-1 bg-dark">\n';
		musicPlayerHTML = musicPlayerHTML + '			<div class="col-10 col-sm-10 text-white">\n';
		musicPlayerHTML = musicPlayerHTML + '				<span id="songName">'+audioFileName+'</span>\n';
		musicPlayerHTML = musicPlayerHTML + '			</div>\n';
		musicPlayerHTML = musicPlayerHTML + '			<div class="col-2 col-sm-2">\n';
		musicPlayerHTML = musicPlayerHTML + '				<img id="audio_eq_icon" src="mp_plugin/mp_icons/audio_eq_pause.png" class="img-fluid" alt="Audio Animation">\n';
		musicPlayerHTML = musicPlayerHTML + '			</div>\n';
		musicPlayerHTML = musicPlayerHTML + '		</div>\n';
		musicPlayerHTML = musicPlayerHTML + '	</div>\n';
		
		$('#'+musicPlayerDivID).html(musicPlayerHTML);
		
		$(window).resize(resetSongNameAnimation);
		$('#musicPlayerButton').click(musicPlayerButtonPressed);
		
		console.log('function [setupMusicPlayer] executed successfully');
    });
}

function startSongNameAnimation()
{
	var audioIsPaused = $('#musicPlayerControls')[0].paused;

	if ($('#songName').css('opacity') == 0)
	{
		$('#songName').css({position: "absolute", left:5, opacity: 1});
	}
	else
	{
		$('#songName').css({position: "absolute"});	
	}

	var songNameWidth = $("#songName").width();
	var maxSlideWidth = $("#songName").parent().width() - songNameWidth;
	var animationLength = $(window).width() * 20;
	
	if(!audioIsPaused)
	{
		$("#songName").animate({opacity: 0, left: maxSlideWidth}, animationLength, function(){ startSongNameAnimation(); });
		startEqIconAnimation();
	}
	else
	{
		//stopEqIconAnimation();
		musicPlayerButtonPressed();
	}
}

function stopSongNameAnimation()
{
	$("#songName").stop();
	$("#songName").clearQueue();
	stopEqIconAnimation();
}

function resetSongNameAnimation()
{
	stopSongNameAnimation();
	startSongNameAnimation();
}

function startEqIconAnimation()
{
	$('#audio_eq_icon').attr("src","mp_plugin/mp_icons/audio_eq_play.gif");
}

function stopEqIconAnimation()
{
	$('#audio_eq_icon').attr("src","mp_plugin/mp_icons/audio_eq_pause.png");
}
function musicPlayerButtonPressed()
{
	console.log('music player button pressed');
	var musicPlayerButtonHTML = $('#musicPlayerButton').html();
	var pauseButtonHTML = "pause_circle_outline";
	var playButtonHTML  = "play_circle_outline";

	if (musicPlayerButtonHTML == playButtonHTML)
	{
		$('#musicPlayerButton').html(pauseButtonHTML);
		$('#musicPlayerControls')[0].play();
		startSongNameAnimation();
	}
	else
	{
		$('#musicPlayerButton').html(playButtonHTML);
		$('#musicPlayerControls')[0].pause();
		stopSongNameAnimation();
	}
}
