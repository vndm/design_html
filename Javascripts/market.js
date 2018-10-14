<!--
function updateTotal()
{
	$('span[id^=total]').each(function()
	{
		var xTotal = 0;

		$($(this).data('market')+' tbody tr').each(function(){
			xTotal += parseFloat($(this).find('span[class^=volume]').html().replace(/,/g,''));
		});
		$(this).html(xTotal);
	});
}
$(document).ready(function()
{
	var socket = io.connect('wss://socket.vndm.io/MARKET',{'forceNew': true});
	
	socket.on('CHANGE', function(jsonData)
	{
		$('.bid_' + jsonData.Market).html($.number(jsonData.Data.Bid,8,'.',','));
		$('.ask_' + jsonData.Market).html($.number(jsonData.Data.Ask,8,'.',','));
		$('.last_' + jsonData.Market).html($.number(jsonData.Data.Last,8,'.',','));
		$('.low_' + jsonData.Market).html($.number(jsonData.Data.Low,8,'.',','));
		$('.high_' + jsonData.Market).html($.number(jsonData.Data.High,8,'.',','));
		$('.volume_' + jsonData.Market).html($.number(jsonData.Data.Volume.Quote,0,'.',','));
		if(jsonData.Data.Change.Percent == 0)
		{
			$('.change_' + jsonData.Market).html('<strong>0%</strong>');
		}
		else
		{
			if(jsonData.Data.Change.Percent > 0)
			{
				$('.change_' + jsonData.Market).html('<span class="text-success"><i class="fas fa-arrow-up"></i> <strong>' + jsonData.Data.Change.Percent + '%</strong></span>');
			}
			else
			{
				$('.change_' + jsonData.Market).html('<span class="text-danger"><i class="fas fa-arrow-down"></i> <strong>' + jsonData.Data.Change.Percent + '%</strong></span>');
			}
		}
		updateTotal();
	});
});
//-->