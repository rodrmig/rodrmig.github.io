var g_photoGridVersion    = 'pg_plugin_v1.2';
var g_maxImageCountPerRow = 3;
var g_imageCount          = 0;
var g_photoGridModalID    = 'XX_photoGridModal';

function setupPhotoGrid(imageCount)
{
	g_imageCount = imageCount;
	
	setPhotoGridHTML();
	setPhotoGridModalAction();
}

function getPhotoGridHTML()
{
	return getPhotoGridAlbumHTML() + getPhotoGridModalHTML();
}

function getPhotoGridAlbumHTML()
{
	var photoGridAlbumHTML = '';
	var photoGridRowCount  = getPhotoGridRowCount();
	var loopImageCount     = 0;

	for(var rowIndex = 1; rowIndex <= photoGridRowCount; rowIndex++)
	{
		photoGridAlbumHTML = photoGridAlbumHTML + '<div class="row">\n';

		for(var columnIndex = 1; columnIndex <= g_maxImageCountPerRow; columnIndex++)
		{
			loopImageCount++;

			if(loopImageCount <= g_imageCount)
			{
				photoGridAlbumHTML =  photoGridAlbumHTML + '	<div class="col">\n';
				photoGridAlbumHTML =  photoGridAlbumHTML + '		<img src="'+g_photoGridVersion+'/pg_images/img_'+loopImageCount+'.jpeg" class="img-fluid mt-2 mb-2" data-toggle="modal" data-target="#'+g_photoGridModalID+'" alt="Image">\n';
				photoGridAlbumHTML =  photoGridAlbumHTML + '	</div>\n';
			}
		}

		photoGridAlbumHTML =  photoGridAlbumHTML + '</div>\n';
	}

	return photoGridAlbumHTML;
}

function getPhotoGridModalHTML()
{
	var photoGridModalHTML = '';
	
	photoGridModalHTML = photoGridModalHTML + '<div class="modal fade" id="'+g_photoGridModalID+'" tabindex="-1" role="dialog" aria-hidden="true">\n';
	photoGridModalHTML = photoGridModalHTML + '	<div class="modal-dialog" role="document">\n';
	photoGridModalHTML = photoGridModalHTML + '	<div class="modal-content bg-transparent border-0">\n';
	photoGridModalHTML = photoGridModalHTML + '		<div class="modal-body">\n';
	photoGridModalHTML = photoGridModalHTML + '			<button type="button" class="close" data-dismiss="modal" aria-label="Close">\n';
	photoGridModalHTML = photoGridModalHTML + '				<span aria-hidden="true">&times;</span>\n';
	photoGridModalHTML = photoGridModalHTML + '			</button>\n';
	photoGridModalHTML = photoGridModalHTML + '			<img src="'+g_photoGridVersion+'/pg_images/img_1.jpeg" id="XX_modalImage" class="img-fluid mt-1" alt="Image">\n';
	photoGridModalHTML = photoGridModalHTML + '		</div>\n';
	photoGridModalHTML = photoGridModalHTML + '	</div>\n';
	photoGridModalHTML = photoGridModalHTML + '	</div>\n';
	photoGridModalHTML = photoGridModalHTML + '</div>\n';

	return photoGridModalHTML;
}

function getPhotoGridRowCount()
{
	var photoGridRowCount = 0;

	if(g_imageCount > 0 && g_imageCount <= g_maxImageCountPerRow)
	{
		photoGridRowCount = 1;
	}
	else if (g_imageCount > g_maxImageCountPerRow)
	{
		photoGridRowCount = Math.ceil(g_imageCount/g_maxImageCountPerRow);
	}

	return photoGridRowCount;
}

function setPhotoGridModalAction()
{

	$('#'+g_photoGridModalID).on('show.bs.modal', function (event) {
	  var modal             = $(this)
	  var targetImageSource = $(event.relatedTarget).attr('src'); // Image that triggered the modal

	  $('#XX_modalImage').attr('src', targetImageSource);
	});

}

function setPhotoGridHTML()
{
	var photoGridHTML = getPhotoGridHTML();
	
	$('#photoGrid').html(photoGridHTML);
}