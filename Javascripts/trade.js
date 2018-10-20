<!--
function adjustPrice(Decimal,Default)
{
	if(Decimal == Default)
	{
		return 0;
	}
	else
	{
		switch(parseInt(Decimal))
		{
			case 1	:
				return 0.05;
			break;
			case 2	:
				return 0.005;
			break;
			case 3	:
				return 0.0005;
			break;
			case 4	:
				return 0.00005;
			break;
			case 5	:
				return 0.000005;
			break;
			case 6	:
				return 0.0000005;
			break;
			case 7	:
				return 0.00000005;
			break;
			default	:
				return 0.000000005;
			break;
		}
	}
}

function setMaximum(Type)
{
	if(Type == 'BUY')
	{
		$('form[name=frmBuy] input[name=percent]').click();
	}
	if(Type == 'SELL')
	{
		$('form[name=frmSell] input[name=percent]').click();
	}
}

function getFee(Type)
{
	if(Type == 'BUY')
	{
		Fee = 0;
		if($('form[name=frmBuy] input[name=xFee]').val() != '')
		{
			Fee = $('form[name=frmBuy] input[name=xFee]').val().replace(/,/g,'');
		}
		
		// Price //
		Price = 0;
		if($('form[name=frmBuy] input[name=xPrice]').val() != '')
		{
			Price = $('form[name=frmBuy] input[name=xPrice]').val().replace(/,/g,'');
		}
		
		// Amount //
		Amount = 0;
		if($('form[name=frmBuy] input[name=xAmount]').val() != '')
		{
			Amount = $('form[name=frmBuy] input[name=xAmount]').val().replace(/,/g,'');
		}
		
		Result = 0;
		Result = Amount * Price;$('input[name=buyTotal]').val($.number(Result,Decimal['QUOTE']));
		Result = Amount * Fee;$('input[name=buyFee]').val($.number(Result,Decimal['BASE']));
		Result = Amount * (1 - Fee);$('input[name=buyReceive]').val($.number(Result,Decimal['BASE']));
	}
	if(Type == 'SELL')
	{
		Fee = 0;
		if($('form[name=frmSell] input[name=xFee]').val() != '')
		{
			Fee = $('form[name=frmSell] input[name=xFee]').val().replace(/,/g,'');
		}
		
		// Price //
		Price = 0;
		if($('form[name=frmSell] input[name=xPrice]').val() != '')
		{
			Price = $('form[name=frmSell] input[name=xPrice]').val().replace(/,/g,'');
		}
		
		// Amount //
		Amount = 0;
		if($('form[name=frmSell] input[name=xAmount]') != '')
		{
			Amount = $('form[name=frmSell] input[name=xAmount]').val().replace(/,/g,'');
		}
		
		Result = 0;
		Result = Amount * Price;$('input[name=sellTotal]').val($.number(Result,Decimal['QUOTE']));
		Result = Amount * Price * Fee;$('input[name=sellFee]').val($.number(Result,Decimal['QUOTE']));
		Result = Amount * Price * (1 - Fee);$('input[name=sellReceive]').val($.number(Result,Decimal['QUOTE']));
	}
}

function setAmount(Type,Currency,Percent)
{
	var	Price = 0;
	var	Amount = 0;
	var	Balance = 0;
	
	// Balance //
	Balance = parseFloat($('#balance' + Currency).html().replace(/,/g,''));
	
	// Price //
	if(Type == 'BUY')
	{
		if($('form[name=frmBuy] input[name=xPrice]').val() != '')
		{
			Price = $('form[name=frmBuy] input[name=xPrice]').val();
		}
		
		if((Balance > 0) && (Price > 0))
		{
			Amount = Balance / Price;
			Amount -= adjustPrice(Decimal['BASE'],Decimal['BASE']);
			
			$('form[name=frmBuy] input[name=xAmount]').val($.number(Amount*Percent,Decimal['BASE']));
		}
	}
	if(Type == 'SELL')
	{
		if(Balance > 0)
		{
			$('form[name=frmSell] input[name=xAmount]').val($.number(Balance*Percent,Decimal['BASE']));
		}
	}
	getFee(Type);
}

function setPrice(Type,Price)
{
	Amount	= 0;
	if(Type == 'BUY')
	{
		$('#sellOrders tbody tr').each(function()
		{
			if(parseFloat($(this).find('td').eq(2).html().replace(/,/g,'')) <= parseFloat(Price.toString().replace(/,/g,'')))
			{
				Amount += parseFloat($(this).find('td').eq(1).html().replace(/,/g,''));
			}
		});
		$('form[name=frmBuy] input[name=xPrice]').val(Price);
		$('form[name=frmSell] input[name=xPrice]').val(Price);
		$('form[name=frmBuy] input[name=xAmount]').val($.number(Amount,Decimal['BASE']));
	}
	if(Type == 'SELL')
	{
		$('#buyOrders tbody tr').each(function()
		{
			if(parseFloat($(this).find('td').eq(0).html().replace(/,/g,'')) >= parseFloat(Price.toString().replace(/,/g,'')))
			{
				Amount += parseFloat($(this).find('td').eq(1).html().replace(/,/g,''));
			}
		});
		$('form[name=frmBuy] input[name=xPrice]').val(Price);
		$('form[name=frmSell] input[name=xPrice]').val(Price);
		$('form[name=frmSell] input[name=xAmount]').val($.number(Amount,Decimal['BASE']));
	}
	getFee(Type);
}

function pickPrice(Action,Type)
{
	if(Action == 'BUY')
	{
		$('form[name=frmBuy] input[name=xPrice]').val(marketPrice[Type]);
	}
	if(Action == 'SELL')
	{
		$('form[name=frmSell] input[name=xPrice]').val(marketPrice[Type]);
	}
}

function showField(Type)
{
	$('form[name=frmBuy] .form-group').hide();
	$('form[name=frmSell] .form-group').hide();
	$('form[name=frmBuy] .' + Type.toString().toLowerCase()).show();
	$('form[name=frmSell] .' + Type.toString().toLowerCase()).show();
}

function buyOrder()
{
	var xMarket = $('form[name=frmBuy] input[name=xMarket]').val();
	var xAmount = $('form[name=frmBuy] input[name=xAmount]').val().toString().replace(/,/g,'');
	
	switch($('#orderType').val().toString().toUpperCase())
	{
		case 'MARKET'	:
			$.ajax({
				type : 'POST',
				url :'buy/market',
				dataType: 'json',
				data:{'xMarket':Market,'xAmount':xAmount},
				success : function (jsonData)
				{
					for(i in jsonData.errors)
					{
						toastr.warning(jsonData.errors[i]);
					}
					for(i in jsonData.messages)
					{
						toastr.success(jsonData.messages[i]);
					}
				}
			});
		break;
		
		case 'MARGIN'	:
			var xTP = $('form[name=frmBuy] input[name=xTP]').val();
			var xSL = $('form[name=frmBuy] input[name=xSL]').val();
			var xLeverage = $('form[name=frmBuy] input[name=xLeverage]:checked').val();
			var xCurrency = $('form[name=frmBuy] input[name=xCurrency]:checked').val();
			
			$.ajax({
				type : 'POST',
				url :'buy/margin',
				dataType: 'json',
				data:{'xMarket':Market,'xAmount':xAmount,'xTP':xTP,'xSL':xSL,'xCurrency':xCurrency,'xLeverage':xLeverage},
				success : function (jsonData)
				{
					for(i in jsonData.errors)
					{
						toastr.warning(jsonData.errors[i]);
					}
					for(i in jsonData.messages)
					{
						toastr.success(jsonData.messages[i]);
					}
				}
			});
			
		break;
		
		case 'CONDITION'	:
			var xType = $('form[name=frmBuy] input[name=xType]:checked').val();// - LIMIT, MARKET
			var xReference = $('form[name=frmBuy] select[name=xReference]').val();// - BID, ASK, LAST
			var xCondition = $('form[name=frmBuy] select[name=xCondition]').val();// LTOE, GTOE
			var xPrice = $('form[name=frmBuy] input[name=xPrice]').val().toString().replace(/,/g,'');
			var xTarget = $('form[name=frmBuy] input[name=xTarget]').val().toString().replace(/,/g,'');
			
			$.ajax({
				type : 'POST',
				url :'buy/condition',
				dataType: 'json',
				data:{'xMarket':Market,'xAmount':xAmount,'xPrice':Price,'xType':xType,'xReference':xReference,'xCondition':xCondition,'xTarget':xTarget},
				success : function (jsonData)
				{
					for(i in jsonData.errors)
					{
						toastr.warning(jsonData.errors[i]);
					}
					for(i in jsonData.messages)
					{
						toastr.success(jsonData.messages[i]);
					}
				}
			});
		break;
		
		default	:
			var xPlaced = $('form[name=frmBuy] input[name=xPlaced]:checked').val();
			var xPrice = $('form[name=frmBuy] input[name=xPrice]').val().toString().replace(/,/g,'')
			
			$.ajax({
				type : 'POST',
				url :'buy/limit',
				dataType: 'json',
				data:{'xMarket':Market,'xAmount':xAmount,'xPrice':Price,'xPlaced':xPlaced},
				success : function (jsonData)
				{
					for(i in jsonData.errors)
					{
						toastr.warning(jsonData.errors[i]);
					}
					for(i in jsonData.messages)
					{
						toastr.success(jsonData.messages[i]);
					}
				}
			});
		break;
	}
}

function sellOrder()
{
	var xMarket = $('form[name=frmSell] input[name=xMarket]').val();
	var xAmount = $('form[name=frmSell] input[name=xAmount]').val().toString().replace(/,/g,'');
	
	switch($('#orderType').val().toString().toUpperCase())
	{
		case 'MARKET'	:
			$.ajax({
				type : 'POST',
				url :'sell/market',
				dataType: 'json',
				data:{'xMarket':Market,'xAmount':xAmount},
				success : function (jsonData)
				{
					for(i in jsonData.errors)
					{
						toastr.warning(jsonData.errors[i]);
					}
					for(i in jsonData.messages)
					{
						toastr.success(jsonData.messages[i]);
					}
				}
			});
		break;
		
		case 'MARGIN'	:
			var xTP = $('form[name=frmSell] input[name=xTP]').val();
			var xSL = $('form[name=frmSell] input[name=xSL]').val();
			var xLeverage = $('form[name=frmSell] input[name=xLeverage]:checked').val();
			var xCurrency = $('form[name=frmSell] input[name=xCurrency]:checked').val();
			
			$.ajax({
				type : 'POST',
				url :'sell/margin',
				dataType: 'json',
				data:{'xMarket':Market,'xAmount':xAmount,'xTP':xTP,'xSL':xSL,'xCurrency':xCurrency,'xLeverage':xLeverage},
				success : function (jsonData)
				{
					for(i in jsonData.errors)
					{
						toastr.warning(jsonData.errors[i]);
					}
					for(i in jsonData.messages)
					{
						toastr.success(jsonData.messages[i]);
					}
				}
			});
		break;
		
		case 'CONDITION'	:
			var xType = $('form[name=frmSell] input[name=xType]:checked').val();// - LIMIT, MARKET
			var xReference = $('form[name=frmSell] select[name=xReference]').val();// - BID, ASK, LAST
			var xCondition = $('form[name=frmSell] select[name=xCondition]').val();// LTOE, GTOE
			var xPrice = $('form[name=frmSell] input[name=xPrice]').val().toString().replace(/,/g,'');
			var xTarget = $('form[name=frmSell] input[name=xTarget]').val().toString().replace(/,/g,'');
			
			$.ajax({
				type : 'POST',
				url :'sell/condition',
				dataType: 'json',
				data:{'xMarket':Market,'xAmount':xAmount,'xPrice':Price,'xType':xType,'xReference':xReference,'xCondition':xCondition,'xTarget':xTarget},
				success : function (jsonData)
				{
					for(i in jsonData.errors)
					{
						toastr.warning(jsonData.errors[i]);
					}
					for(i in jsonData.messages)
					{
						toastr.success(jsonData.messages[i]);
					}
				}
			});
		break;
		
		default	:
			var xPlaced = $('form[name=frmSell] input[name=xPlaced]:checked').val();
			var xPrice = $('form[name=frmSell] input[name=xPrice]').val().toString().replace(/,/g,'')
			
			$.ajax({
				type : 'POST',
				url :'sell/limit',
				dataType: 'json',
				data:{'xMarket':Market,'xAmount':Amount,'xPrice':Price,'xPlaced':xPlaced},
				success : function (jsonData)
				{
					for(i in jsonData.errors)
					{
						toastr.warning(jsonData.errors[i]);
					}
					for(i in jsonData.messages)
					{
						toastr.success(jsonData.messages[i]);
					}
				}
			});
		break;
	}
}

function addRow(Action,Price,Amount,Total)
{
	if(Action == 'BUY')
	{
		return '<tr class="clickable" onclick="setPrice(\'SELL\',\'' + Price + '\')"><td align="center">' + Price + '</td><td align="center">' + Amount + '</td><td align="center">' + Total + '</td></tr>';
	}
	if(Action == 'SELL')
	{
		return '<tr class="clickable" onclick="setPrice(\'BUY\',\'' + Price + '\')"><td align="center">' + Total + '</td><td align="center">' + Amount + '</td><td align="center">' + Price + '</td></tr>';
	}
	if(Action == 'EMPTY')
	{
		return '<tr><td align="center">&nbsp;</td><td align="center">&nbsp;</td><td align="center">&nbsp;</td></tr>';
	}
}

var marketPrice = {'BID':0,'ASK':0,'LAST':0};

var socket = io.connect('wss://socket.vndm.io/TRADE',{'forceNew': true});

socket.on('BUY', function(jsonData)
{
	if(jsonData.Market == Market)
	{
		var	vBase		= 0;
		var	vQuote		= 0;
		var bDecimal	= $('#buyDecimal').val();
		
		$('#buyOrders tbody tr').remove();
		if(jsonData.Data.length > 0)
		{
			for(i in jsonData.Data)
			{
				jsonData.Data[i].Price -= adjustPrice(bDecimal,Decimal['QUOTE']);
				jsonData.Data[i].Price = $.number(jsonData.Data[i].Price,bDecimal,'.','');
			}
			for(i=0;i<jsonData.Data.length-1;i++)
			{
				if(jsonData.Data[i].Price == jsonData.Data[i+1].Price)
				{
					jsonData.Data[i+1].Amount += jsonData.Data[i].Amount;
					delete jsonData.Data[i];
				}
			}
			for(i in jsonData.Data)
			{
				vBase	+= jsonData.Data[i].Amount;
				vQuote	+= jsonData.Data[i].Amount * jsonData.Data[i].Price;
				
				$('#buyOrders tbody').append(addRow('BUY',$.number(jsonData.Data[i].Price,bDecimal,'.',','),$.number(jsonData.Data[i].Amount,Decimal['BASE'],'.',','),$.number(jsonData.Data[i].Price * jsonData.Data[i].Amount,Decimal['QUOTE'],'.',',')));
			}
			for(var i = jsonData.Data.length % $('#buyOrders').data('record');i<$('#buyOrders').data('record');i++)
			{
				$('#buyOrders tbody').append(addRow('EMPTY',0,0,0));
			}
			viewPage('#buyOrders',0);
			$('.bidPrice').html($.number(jsonData.Data[0].Price,Decimal['QUOTE'],'.',','));
			marketPrice['BID'] = $.number(jsonData.Data[0].Price,Decimal['QUOTE'],'.',',');
		}
		else
		{
			$('#buyOrders tbody').append('<tr><td colspan="3" align="center">' + Language['EMPTY'] + '</td></tr>');
		}
		
		$('#volumeBuyBase').html($.number(vBase,Decimal['BASE'],'.',','));
		$('#volumeBuyQuote').html($.number(vQuote,Decimal['QUOTE'],'.',','));
	}
});

socket.on('SELL', function(jsonData)
{
	if(jsonData.Market == Market)
	{
		var	vBase		= 0;
		var	vQuote		= 0;
		var sDecimal	= $('#sellDecimal').val();
		
		$('#sellOrders tbody tr').remove();
		if(jsonData.Data.length > 0)
		{
			for(i in jsonData.Data)
			{
				jsonData.Data[i].Price += adjustPrice(sDecimal,Decimal['QUOTE']);
				jsonData.Data[i].Price = $.number(jsonData.Data[i].Price,sDecimal,'.','');
			}
			for(i=0;i<jsonData.Data.length-1;i++)
			{
				if(jsonData.Data[i].Price == jsonData.Data[i+1].Price)
				{
					jsonData.Data[i+1].Amount += jsonData.Data[i].Amount;
					delete jsonData.Data[i];
				}
			}
			for(i in jsonData.Data)
			{
				vBase	+= jsonData.Data[i].Amount;
				vQuote	+= jsonData.Data[i].Amount * jsonData.Data[i].Price;
				
				$('#sellOrders tbody').append(addRow('SELL',$.number(jsonData.Data[i].Price,sDecimal,'.',','),$.number(jsonData.Data[i].Amount,Decimal['BASE'],'.',','),$.number(jsonData.Data[i].Price * jsonData.Data[i].Amount,Decimal['QUOTE'],'.',',')));
			}
			for(var i = jsonData.Data.length % $('#sellOrders').data('record');i<$('#sellOrders').data('record');i++)
			{
				$('#sellOrders tbody').append(addRow('EMPTY',0,0,0));
			}
			viewPage('#sellOrders',0);
			$('.askPrice').html($.number(jsonData.Data[0].Price,Decimal['QUOTE'],'.',','));
			marketPrice['ASK'] = $.number(jsonData.Data[0].Price,Decimal['QUOTE'],'.',',');
		}
		else
		{
			$('#sellOrders tbody').append('<tr><td colspan="3" align="center">' + Language['EMPTY'] + '</td></tr>');
		}
		
		$('#volumeSellBase').html($.number(vBase,Decimal['BASE'],'.',','));
		$('#volumeSellQuote').html($.number(vQuote,Decimal['QUOTE'],'.',','));
	}
});

socket.on('TRADE', function(jsonData)
{
	if(jsonData.Market == Market)
	{
		$('.lastPrice').html($.number(jsonData.Data.Price,Decimal['QUOTE'],'.',','));
		
		marketPrice['LAST'] = $.number(jsonData.Data.Price,Decimal['QUOTE'],'.',',');
		
		if(jsonData.Data.Action == 'BUY')
		{
			$('#lastPrice').html('<i class="fas fa-arrow-up"></i> ' + $.number(jsonData.Data.Price,Decimal['QUOTE'],'.',',')).removeClass('text-danger').addClass('text-success');
		}
		if(jsonData.Data.Action == 'SELL')
		{
			$('#lastPrice').html('<i class="fas fa-arrow-down"></i> ' + $.number(jsonData.Data.Price,Decimal['QUOTE'],'.',',')).removeClass('text-success').addClass('text-danger');
		}
		if(jsonData.Data.Buyer == User)
		{
			toastr.success(Language['BUY'] + ' ' + $.number(jsonData.Data.Amount,Decimal['BASE'],'.',',') + ' ' + Currency['BASE'] + ', ' + Language['PRICE'] + ' : ' + $.number(jsonData.Data.Price,Decimal['QUOTE'],'.',',') + ' ' + Currency['QUOTE'] + ', ' + Language['TOTAL'] + ' : ' + $.number(jsonData.Data.Price * jsonData.Data.Amount,Decimal['QUOTE'],'.',',') + ' ' + Currency['QUOTE']);
		}
		if(jsonData.Data.Seller == User)
		{
			toastr.success(Language['SELL'] + ' ' + $.number(jsonData.Data.Amount,Decimal['BASE'],'.',',') + ' ' + Currency['BASE'] + ', '+ Language['PRICE'] + ' : ' + $.number(jsonData.Data.Price,Decimal['QUOTE'],'.',',') + ' ' + Currency['QUOTE'] + ', ' + Language['TOTAL'] + ' : ' + $.number(jsonData.Data.Price * jsonData.Data.Amount,Decimal['QUOTE'],'.',',') + ' ' + Currency['QUOTE']);
		}
		
		var arrayDate	= [];
		var newBuy		= $('#tblTrades').data('new-buy');
		var newSell		= $('#tblTrades').data('new-sell');
		
		arrayDate = jsonData.Data.Date.split(' ');
		jsonData.Data.Date = arrayDate[0];
		jsonData.Data.Time = arrayDate[1];
		jsonData.Data.Total = $.number(jsonData.Data.Price * jsonData.Data.Amount,Decimal['QUOTE'],'.',',');
		jsonData.Data.Price = $.number(jsonData.Data.Price,Decimal['QUOTE'],'.',',');
		jsonData.Data.Amount = $.number(jsonData.Data.Amount,Decimal['BASE'],'.',',');
		
		for(i in jsonData.Data)
		{
			newBuy = newBuy.replace('[' + i + ']',jsonData.Data[i]);
			newSell = newSell.replace('[' + i + ']',jsonData.Data[i]);
		}
		
		if(jsonData.Data.Action == 'BUY')
		{
			$('#tblTrades tbody').prepend(newBuy);
		}
		if(jsonData.Data.Action == 'SELL')
		{
			$('#tblTrades tbody').prepend(newSell);
		}
		
		$('#tblTrades div.new').hide().slideDown('slow').removeClass('new').addClass('old');
		$('#tblTrades div.up').effect( "highlight", {color:"#64B367"}, 1000 ).removeClass('up');
		$('#tblTrades div.down').effect( "highlight", {color:"#E68588"}, 1000 ).removeClass('down');
		
		totalRow = $('#tblTrades tbody tr').length;
		if(totalRow > Record['TRADE'])
		{
			for(var i = totalRow - 1; i >= Record['TRADE']; i--)
			{
				$('#tblTrades tbody tr').get(i).remove();
			}
		}
	}
});

socket.on('MARKET', function(jsonData)
{
	if(jsonData.Market == Market)
	{
		$('#lowPrice').html($.number(jsonData.Data.Low,Decimal['QUOTE'],'.',','));
		$('#highPrice').html($.number(jsonData.Data.High,Decimal['QUOTE'],'.',','));
		$('#marketVolume').html($.number(jsonData.Data.Volume.Base,Decimal['BASE'],'.',','));
	}
});

var initialize = io.connect('wss://socket.vndm.io/INITIALIZE',{'forceNew': true});

initialize.on('BUY', function(jsonData)
{
	var	vBase		= 0;
	var	vQuote		= 0;
	var bDecimal	= $('#buyDecimal').val();
	
	$('#buyOrders tbody tr').remove();
	if(jsonData.length > 0)
	{
		for(i in jsonData)
		{
			jsonData[i].Price -= adjustPrice(bDecimal,Decimal['QUOTE']);
			jsonData[i].Price = $.number(jsonData[i].Price,bDecimal,'.','');
		}
		for(i=0;i<jsonData.length-1;i++)
		{
			if(jsonData[i].Price == jsonData[i+1].Price)
			{
				jsonData[i+1].Amount += jsonData[i].Amount;
				delete jsonData[i];
			}
		}
		for(i in jsonData)
		{
			vBase	+= jsonData[i].Amount;
			vQuote	+= jsonData[i].Amount * jsonData[i].Price;
			
			if($('form[name=frmSell] input[name=xPrice]').val() == '')
			{
				$('form[name=frmSell] input[name=xPrice]').val($.number(jsonData[i].Price,bDecimal,'.',','));
			}
			
			if(i < Record['ORDER'])
			{
				$('#buyOrders tbody').append(addRow('BUY',$.number(jsonData[i].Price,bDecimal,'.',','),$.number(jsonData[i].Amount,Decimal['BASE'],'.',','),$.number(jsonData[i].Price * jsonData[i].Amount,Decimal['QUOTE'],'.',',')));
			}
		}
		for(var i = jsonData.length % $('#buyOrders').data('record');i<$('#buyOrders').data('record');i++)
		{
			$('#buyOrders tbody').append(addRow('EMPTY',0,0,0));
		}
		viewPage('#buyOrders',1);
		$('.bidPrice').html($.number(jsonData[0].Price,Decimal['QUOTE'],'.',','));
		marketPrice['BID'] = $.number(jsonData[0].Price,Decimal['QUOTE'],'.',',');
	}
	else
	{
		$('#buyOrders tbody').append('<tr><td colspan="3" align="center">' + Language['EMPTY'] + '</td></tr>');
	}
	
	$('#volumeBuyBase').html($.number(vBase,Decimal['BASE'],'.',','));
	$('#volumeBuyQuote').html($.number(vQuote,Decimal['QUOTE'],'.',','));
});

initialize.on('SELL', function(jsonData)
{
	var	vBase		= 0;
	var	vQuote		= 0;
	var sDecimal	= $('#sellDecimal').val();
	
	$('#sellOrders tbody tr').remove();
	if(jsonData.length > 0)
	{
		for(i in jsonData)
		{
			jsonData[i].Price += adjustPrice(sDecimal,Decimal['QUOTE']);
			jsonData[i].Price = $.number(jsonData[i].Price,sDecimal,'.','');
		}
		for(i=0;i<jsonData.length-1;i++)
		{
			if(jsonData[i].Price == jsonData[i+1].Price)
			{
				jsonData[i+1].Amount += jsonData[i].Amount;
				delete jsonData[i];
			}
		}
		for(i in jsonData)
		{
			vBase	+= jsonData[i].Amount;
			vQuote	+= jsonData[i].Amount * jsonData[i].Price;
			
			if($('form[name=frmBuy] input[name=xPrice]').val() == '')
			{
				$('form[name=frmBuy] input[name=xPrice]').val($.number(jsonData[i].Price,sDecimal,'.',','));
			}
			if(i < Record['ORDER'])
			{
				$('#sellOrders tbody').append(addRow('SELL',$.number(jsonData[i].Price,sDecimal,'.',','),$.number(jsonData[i].Amount,Decimal['BASE'],'.',','),$.number(jsonData[i].Price * jsonData[i].Amount,Decimal['QUOTE'],'.',',')));
			}
		}
		for(var i = jsonData.length % $('#sellOrders').data('record');i<$('#sellOrders').data('record');i++)
		{
			$('#sellOrders tbody').append(addRow('EMPTY',0,0,0));
		}
		viewPage('#sellOrders',1);
		$('.askPrice').html($.number(jsonData[0].Price,Decimal['QUOTE'],'.',','));
		marketPrice['ASK'] = $.number(jsonData[0].Price,Decimal['QUOTE'],'.',',');
	}
	else
	{
		$('#sellOrders tbody').append('<tr><td colspan="3" align="center">' + Language['EMPTY'] + '</td></tr>');
	}
	
	$('#volumeSellBase').html($.number(vBase,Decimal['BASE'],'.',','));
	$('#volumeSellQuote').html($.number(vQuote,Decimal['QUOTE'],'.',','));
});

initialize.on('TRADE', function(jsonData)
{
	$('#tblTrades tbody tr').remove();
	if(jsonData.length > 0)
	{
		for(i in jsonData)
		{
			var arrayDate	= [];
			var oldBuy		= $('#tblTrades').data('old-buy');
			var oldSell		= $('#tblTrades').data('old-sell');
			
			if(i < Record['TRADE'])
			{
				arrayDate = jsonData[i].Date.split(' ');
				jsonData[i].Date = arrayDate[0];
				jsonData[i].Time = arrayDate[1];
				jsonData[i].Total = $.number(jsonData[i].Price * jsonData[i].Amount,Decimal['QUOTE'],'.',',');
				jsonData[i].Price = $.number(jsonData[i].Price,Decimal['QUOTE'],'.',',');
				jsonData[i].Amount = $.number(jsonData[i].Amount,Decimal['BASE'],'.',',');
				
				for(j in jsonData[i])
				{
					oldBuy = oldBuy.replace('[' + j + ']',jsonData[i][j]);
					oldSell = oldSell.replace('[' + j + ']',jsonData[i][j]);
				}
				if(jsonData[i].Action == 'BUY')
				{
					$('#tblTrades tbody').append(oldBuy);
				}
				if(jsonData[i].Action == 'SELL')
				{
					$('#tblTrades tbody').append(oldSell);
				}
			}
		}
		$('#tblTrades').floatThead({
		  scrollContainer: function($table){
			return $table.closest('.table-responsive');
		  }
		});
		$('.lastPrice').html($.number(jsonData[0].Price,Decimal['QUOTE'],'.',','));
		marketPrice['LAST'] = $.number(jsonData[0].Price,Decimal['QUOTE'],'.',',');
	}
	else
	{
		$('#tblTrades tbody').append($('#tblTrades').data('empty'));
	}
});

$(document).ready(function()
{
	// Initialize //
	initialize.emit('BUY',{Market:Market});
	initialize.emit('SELL',{Market:Market});
	initialize.emit('TRADE',{Market:Market});
});
//-->