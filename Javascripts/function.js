function cancelUserOrder()
{
	$.ajax({
		type : 'POST',
		url :'/cancel/order',
		dataType: 'json',
		data:{'xType':'USER'},
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
}

function cancelBuyOrder(Market)
{
	$.ajax({
		type : 'POST',
		url :'/cancel/order',
		dataType: 'json',
		data:{'xType':'BUY','xReference':Market},
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
}

function cancelSellOrder(Market)
{
	$.ajax({
		type : 'POST',
		url :'/cancel/order',
		dataType: 'json',
		data:{'xType':'SELL','xReference':Market},
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
}

function cancelOrder(Order)
{
	$.ajax({
		type : 'POST',
		url :'/cancel/order',
		dataType: 'json',
		data:{'xType':'ORDER','xReference':Order},
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
}

function cancelMarketOrder(Market)
{
	$.ajax({
		type : 'POST',
		url :'/cancel/order',
		dataType: 'json',
		data:{'xType':'MARKET','xReference':Market},
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
}

function cancelUserCondition()
{
	$.ajax({
		type : 'POST',
		url :'/cancel/condition',
		dataType: 'json',
		data:{'xType':'USER'},
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
}

function cancelBuyCondition(Market)
{
	$.ajax({
		type : 'POST',
		url :'/cancel/condition',
		dataType: 'json',
		data:{'xType':'BUY','xReference':Market},
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
}

function cancelSellCondition(Market)
{
	$.ajax({
		type : 'POST',
		url :'/cancel/condition',
		dataType: 'json',
		data:{'xType':'SELL','xReference':Market},
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
}

function cancelCondition(Condition)
{
	$.ajax({
		type : 'POST',
		url :'/cancel/condition',
		dataType: 'json',
		data:{'xType':'CONDITION','xReference':Condition},
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
}

function cancelMarketCondition(Market)
{
	$.ajax({
		type : 'POST',
		url :'/cancel/condition',
		dataType: 'json',
		data:{'xType':'MARKET','xReference':Market},
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
}

function cancelVoucher(Voucher)
{
	$.ajax({
		type : 'POST',
		url :'/cancel/voucher',
		dataType: 'json',
		data:{'xType':'VOUCHER','xReference':Voucher},
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
}

function cancelTransfer(Transfer)
{
	$.ajax({
		type : 'POST',
		url :'/cancel/transfer',
		dataType: 'json',
		data:{'xType':'TRANSFER','xReference':Transfer},
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
}

function cancelWithdrawal(Withdrawal)
{
	$.ajax({
		type : 'POST',
		url :'/cancel/withdrawal',
		dataType: 'json',
		data:{'xType':'WITHDRAWAL','xReference':Withdrawal},
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
}

function viewUser(Page,Record,Sort,Direction)
{
	$.ajax(
    {
        type : 'GET', url : 'affiliate/user/data/' + Record + '/' + Sort + '/' + Direction + '/' + Page,
		beforeSend : function()
		{
			$('#userContainer').fadeTo(100,0.1);
			$('#userContainer .pagination-group button').attr('disabled',true);
		},
        success : function (data) 
        {
            $('#userContainer').html(data).fadeTo(0.1,100);
        }
    });
}

function viewCommission(Page,Record,Sort,Direction)
{
	$.ajax(
    {
        type : 'GET', url : 'affiliate/commission/data/' + Record + '/' + Sort + '/' + Direction + '/' + Page,
		beforeSend : function()
		{
			$('#commissionContainer').fadeTo(100,0.1);
			$('#commissionContainer .pagination-group button').attr('disabled',true);
		},
        success : function (data) 
        {
            $('#commissionContainer').html(data).fadeTo(0.1,100);
        }
    });
}