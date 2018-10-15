<!--
function checkUsername(Username)
{
	if(Username != '')
	{
		$('.xUsername').html('<i class="fas fa-sync-alt fa-spin fa-fw"></i>');
		
		$.ajax(
		{
			type : 'GET', url : 'ajax/username/' + Username,dataType: 'json',
			success : function (data) 
			{
				if(data.status)
				{
					$('.xUsername').html('<i class="fa fa-check text-success fa-fw"></i>');
				}
				else
				{
					$('.xUsername').html('<i class="fa fa-times text-danger fa-fw"></i>');
				}
			}
		});
	}
}

function checkPhone(Phone)
{
	if(Phone != '')
	{
		$('.xPhone').html('<i class="fas fa-sync-alt fa-spin fa-fw"></i>');
		
		$.ajax(
		{
			type : 'GET', url : 'ajax/phone/' + Phone,dataType: 'json',
			success : function (data) 
			{
				if(data.status)
				{
					$('.xPhone').html('<i class="fa fa-check text-success fa-fw"></i>');
				}
				else
				{
					$('.xPhone').html('<i class="fa fa-times text-danger fa-fw"></i>');
				}
			}
		});
	}
}

function checkEmail(Email)
{
	if(Email != '')
	{
		$('.xEmail').html('<i class="fas fa-sync-alt fa-spin fa-fw"></i>');
		
		$.ajax(
		{
			type : 'GET', url : 'ajax/email/' + Email,dataType: 'json',
			success : function (data) 
			{
				if(data.status)
				{
					$('.xEmail').html('<i class="fa fa-check text-success fa-fw"></i>');
				}
				else
				{
					$('.xEmail').html('<i class="fa fa-times text-danger fa-fw"></i>');
				}
			}
		});
	}
}

$('select[name=xCountry]').change(function()
{
	$('input[name=xPhone]').inputmask({ 'mask': $(this).find('option:selected').attr('phone') + '999999999[9]', 'greedy': false });
});
//-->