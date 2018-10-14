function setReference(Condition,Reference)
{
	$.ajax({
		type : 'POST',
		url :'/update',
		dataType: 'json',
		data:{'xCondition':Condition,'xReference':Reference},
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

function viewOrder(Page,Record,Sort,Direction)
{
	$.ajax(
    {
        type : 'GET', url : 'history/order/data/' + Record + '/' + Sort + '/' + Direction + '/' + Page,
		beforeSend : function()
		{
			$('#orderContainer').fadeTo(100,0.1);
			$('#orderContainer .pagination-group button').attr('disabled',true);
		},
        success : function (data) 
        {
            $('#orderContainer').html(data).fadeTo(0.1,100);
        }
    });
}

function viewMargin(Page,Record,Sort,Direction)
{
	$.ajax(
    {
        type : 'GET', url : 'history/margin/data/' + Record + '/' + Sort + '/' + Direction + '/' + Page,
		beforeSend : function()
		{
			$('#marginContainer').fadeTo(100,0.1);
			$('#marginContainer .pagination-group button').attr('disabled',true);
		},
        success : function (data) 
        {
            $('#marginContainer').html(data).fadeTo(0.1,100,function(){
				initialize.emit('MARKET',{ Market : '*' });
			});
        }
    });
}

function viewCondition(Page,Record,Sort,Direction)
{
	$.ajax(
    {
        type : 'GET', url : 'history/condition/data/' + Record + '/' + Sort + '/' + Direction + '/' + Page,
		beforeSend : function()
		{
			$('#conditionContainer').fadeTo(100,0.1);
			$('#conditionContainer .pagination-group button').attr('disabled',true);
		},
        success : function (data) 
        {
            $('#conditionContainer').html(data).fadeTo(0.1,100,function(){
				initialize.emit('MARKET',{ Market : '*' });
			});
        }
    });
}

function viewTrade(Page,Record,Sort,Direction)
{
	$.ajax(
    {
        type : 'GET', url : 'history/trade/data/' + Record + '/' + Sort + '/' + Direction + '/' + Page,
		beforeSend : function()
		{
			$('#tradeContainer').fadeTo(100,0.1);
			$('#tradeContainer .pagination-group button').attr('disabled',true);
		},
        success : function (data) 
        {
            $('#tradeContainer').html(data).fadeTo(0.1,100);
        }
    });
}
function viewLogin(Page,Record,Sort,Direction)
{
	$.ajax(
    {
        type : 'GET', url : 'history/login/data/' + Record + '/' + Sort + '/' + Direction + '/' + Page,
		beforeSend : function()
		{
			$('#loginContainer').fadeTo(100,0.1);
			$('#loginContainer .pagination-group button').attr('disabled',true);
		},
        success : function (data) 
        {
            $('#loginContainer').html(data).fadeTo(0.1,100);
        }
    });
}
function viewDeposit(Page,Record,Sort,Direction)
{
	$.ajax(
    {
        type : 'GET', url : 'history/deposit/data/' + Record + '/' + Sort + '/' + Direction + '/' + Page,
		beforeSend : function()
		{
			$('#depositContainer').fadeTo(100,0.1);
			$('#depositContainer .pagination-group button').attr('disabled',true);
		},
        success : function (data) 
        {
            $('#depositContainer').html(data).fadeTo(0.1,100);
        }
    });
}
function viewTransfer(Page,Record,Sort,Direction)
{
	$.ajax(
    {
        type : 'GET', url : 'history/transfer/data/' + Record + '/' + Sort + '/' + Direction + '/' + Page,
		beforeSend : function()
		{
			$('#transferContainer').fadeTo(100,0.1);
			$('#transferContainer .pagination-group button').attr('disabled',true);
		},
        success : function (data) 
        {
            $('#transferContainer').html(data).fadeTo(0.1,100);
        }
    });
}
function viewVoucher(Page,Record,Sort,Direction)
{
	$.ajax(
    {
        type : 'GET', url : 'history/voucher/data/' + Record + '/' + Sort + '/' + Direction + '/' + Page,
		beforeSend : function()
		{
			$('#voucherContainer').fadeTo(100,0.1);
			$('#voucherContainer .pagination-group button').attr('disabled',true);
		},
        success : function (data) 
        {
            $('#voucherContainer').html(data).fadeTo(0.1,100);
        }
    });
}
function viewWithdrawal(Page,Record,Sort,Direction)
{
	$.ajax(
    {
        type : 'GET', url : 'history/withdrawal/data/' + Record + '/' + Sort + '/' + Direction + '/' + Page,
		beforeSend : function()
		{
			$('#withdrawalContainer').fadeTo(100,0.1);
			$('#withdrawalContainer .pagination-group button').attr('disabled',true);
		},
        success : function (data) 
        {
            $('#withdrawalContainer').html(data).fadeTo(0.1,100);
        }
    });
}
function viewTransaction(Page,Record,Sort,Direction)
{
	$.ajax(
    {
        type : 'GET', url : 'history/transaction/data/' + Record + '/' + Sort + '/' + Direction + '/' + Page,
		beforeSend : function()
		{
			$('#transactionContainer').fadeTo(100,0.1);
			$('#transactionContainer .pagination-group button').attr('disabled',true);
		},
        success : function (data) 
        {
            $('#transactionContainer').html(data).fadeTo(0.1,100);
        }
    });
}