var pageBuy	= 1;
var pageSell= 1;

function viewPage(Table,Page)
{
	var rowPerPage	= $(Table).data('record');
	var totalRow	= $(Table + ' tbody tr').length;
	var totalPage	= Math.ceil(totalRow / rowPerPage);
	
	$(Table + ' tbody tr').each(function()
	{
		$(this).hide();
	});
	
	if(Page == 0)
	{
		if(Table == '#buyOrders')
		{
			Page = pageBuy;
		}
		if(Table == '#sellOrders')
		{
			Page = pageSell;
		}
	}
	
	if(Page < 1)
	{
		Page = 1;
	}
	
	if(Page > totalPage)
	{
		Page = totalPage;
	}
	
	$(Table + ' tbody tr').each(function(i)
	{
		if((i+1 <= rowPerPage * Page) && (i+1 > rowPerPage * (Page - 1)))
		{
			$(this).show();
		}
	});
	
	var htmlFirst = $(Table).data('btn-first').replace('[FIRST]',1);
	if(Page > 1)
	{
		htmlFirst = htmlFirst.replace(' disabled','');
	}
	var htmlPrevious = $(Table).data('btn-previous').replace('[PREVIOUS]',Page - 1 < 1 ? 1 : Page - 1);
	if(Page > 1)
	{
		htmlPrevious = htmlPrevious.replace(' disabled','');
	}
	
	var htmlPage = '';
	for(i=Page-2;i<=Page+2;i++)
	{
		if((i > 0) && (i <= totalPage))
		{
			if(i != Page)
			{
				htmlPage += $(Table).data('btn-page').replace(/\[PAGE\]/g,i);
			}
			else
			{
				if(Table == '#buyOrders')
				{
					pageBuy = Page;
				}
				if(Table == '#sellOrders')
				{
					pageSell = Page;
				}
				htmlPage += $(Table).data('btn-disabled').replace(/\[PAGE\]/g,Page);
			}
		}
	}
	
	var htmlNext = $(Table).data('btn-next').replace('[NEXT]',Page + 1 > totalPage ? totalPage : Page + 1);
	if(Page <= totalPage - 1)
	{
		htmlNext = htmlNext.replace(' disabled','');
	}
	var htmlLast = $(Table).data('btn-last').replace('[LAST]',totalPage);
	if(Page <= totalPage - 1)
	{
		htmlLast = htmlLast.replace(' disabled','');
	}
	
	if(totalPage > 1)
	{
		$($(Table).data('target')).html(htmlFirst + htmlPrevious + htmlPage + htmlNext + htmlLast);
		
		$($(Table).data('target') + ' a').on('click',function()
		{
			viewPage($(this).data('table'),$(this).data('page'));
		});
	}
}