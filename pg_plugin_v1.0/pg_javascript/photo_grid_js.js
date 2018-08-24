var g_photoGridVersion    = 'pg_plugin_v1.0';
var g_maxImageCountPerRow = 3;
var g_imageCount          = 0;

function setupPhotoGrid(imageCount)
{
	g_imageCount      = imageCount;
	var photoGridHTML = getPhotoGridHTML();
	
	$('#photoGrid').html(photoGridHTML);
}

function getPhotoGridHTML()
{
	var photoGridHTML     = '';
	var photoGridRowCount = getPhotoGridRowCount();
	var totalImageIndex   = 0;

	for(var rowIndex = 1; rowIndex <= photoGridRowCount; rowIndex++)
	{
		photoGridHTML = photoGridHTML + '<div class="row">';

		for(var columnIndex = 1; columnIndex <= g_maxImageCountPerRow; columnIndex++)
		{
			totalImageIndex++;

			if(totalImageIndex <= g_imageCount)
			{
				photoGridHTML =  photoGridHTML + '<div class="col">';
				photoGridHTML =  photoGridHTML + '<img src="pg_plugin_v1.0/pg_images/img_'+totalImageIndex+'.jpeg" class="img-fluid mt-1 mb-1" alt="test image">';
				photoGridHTML =  photoGridHTML + '</div>';
			}
		}

		photoGridHTML =  photoGridHTML + '</div>';
	}

	return photoGridHTML;
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

