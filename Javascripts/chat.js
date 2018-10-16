<!--
	var chatIndex	= 0;
	
	function setNotice(User)
	{
		$('input[name=typeMessage]').val('./notice ' + User + ' ');
		$('input[name=typeMessage]').focus();
	}
	
	function loadMessage()
	{
		var	objWindow	= $(window);
		var	objMessage	= $('#listMessage');
		
		if($('.widget-chat-content').hasClass('show'))
		{
			$.ajax({
			type: 		'GET',
			url: 		'ajax/chat/' + chatIndex,
			dataType:	'json',
			success:	function(messages, textStatus, xhr)
			{
				if(xhr.status == 200)
				{
					if(messages.length > 0)
					{
						for(i in messages)
						{
							objMessage.append('<div><b><a href="javascript:void(0)" onClick="setNotice(\'' + messages[i].Username + '\');" title="' + messages[i].Date + '">' + messages[i].Username + '</a></b> : ' + messages[i].Message + '</div>');
						}
						chatIndex = messages[messages.length-1].Index;
						objMessage.scrollTop(objMessage.prop("scrollHeight"));
					}
				}
			}});
		}
	}
	
	function sendMessage(Message)
	{
		if(Message != '')
		{
			$('input[name=typeMessage]').val('');
			$.post('ajax/chat.json',{xMessage : Message.replace(/\?/g,'%3F').replace(/\&/g,'%26') });
		}
	}
	
	var chatHeight = 0;
	
	$(window).on('load resize', function()
	{
		chatHeight = $(window).height() - $('.header').height() - 75;
		chatHeight -= $('.panel-chat-header').outerHeight(true);
		chatHeight -= $('.panel-chat-footer').outerHeight(true);
		$('.panel-chat-content').css('height',chatHeight);
	});

	$(document).on('click', '.chatHandle, .btn-close-chat', function(e)
	{
		e.preventDefault();
		if ($('.widget-chat-content').hasClass('show'))
		{
			$('.chatHandle').removeClass('collapse');
			$('.widget-chat-content').removeClass('show');
		}
		else
		{
			$('.chatHandle').addClass('collapse');
			$('.widget-chat-content').addClass('show');
		}
	});
//-->