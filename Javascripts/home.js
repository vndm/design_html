	$('#market-search-home').on('keyup', function()
	{
		var keyword = $(this).val();
		
		$('.table-market tbody > tr').each(function() {
			if ($(this).text().search(new RegExp(keyword, "i")) < 0) {
				$(this).fadeOut();
				
			}
			else
			{
				if(!$(this).hasClass('collapse'))
				{
					$(this).show();
				}
			}
		});
	});

    /***Support list***/
	$('.support-list').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [{
				breakpoint: 980,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: false
				}
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 568,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

    /***Sider for logo list***/
	$('.partners-slider').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [{
				breakpoint: 980,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: false
				}
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 568,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	
    /***Slider news***/
	$("#breakingNews").BreakingNews({
		width: '100%',
		timer: 6000,
		autoplay: true,
		effect: 'slide'
	});
	
    /****Slider mainviusal***/
	/***Setting slider for bitcoin buy sell list ***/
	var elBitcoin = $(".bitcoin-top .bitcoin-top-inner > div");
	var elPagination = $('.pagination-bitcoin li');
	var totalBuySell = elBitcoin.length;
	var bictionH = elBitcoin.first().height();
	var current = 0;
	var current_ = 0;
	var interval_bitcoin = null;
	var time_interval = 5000;
	var pause = false;
	var bitcoinName = 'Bitcoin';
	elBitcoin.first().addClass('active');
	elBitcoin.parent().css({'height': bictionH, 'overflow': 'hidden'});
	/***End setting slider for bitcoin buy sell list ***/
	 
	/***------ ***/
	var runSliderBitcoin = function( current_ ){
		clearTimeout(interval_bitcoin);
		 current =current_;
		if(!pause){
			if(current >= totalBuySell){
				current = 0;
			}
			elBitcoin.removeClass('active');
			elBitcoin.eq(current).addClass('active');
			bitcoinName = elBitcoin.eq(current).attr('data-name');
			$('.mainvisual .mainvisual-txt2 .bitcoin-top-name').text(bitcoinName);
			$('.pagination-bitcoin li').find('a').removeClass('active');
			$('.pagination-bitcoin li').eq(current).find('a').addClass('active');
			interval_bitcoin = setTimeout(function(){
				current +=1;
				runSliderBitcoin(current);
			}, time_interval);
		}else{;
			interval_bitcoin = setTimeout(function(){
				runSliderBitcoin(current);
			}, time_interval);
		}
	}

	runSliderBitcoin(0);

	if(totalBuySell>0){
		$('.bitcoin-top').append('<ul class="pagination-bitcoin"></ul>');
		for(i=0;i<totalBuySell;i++){
			$('.pagination-bitcoin').append('<li><a href="#"></a></li>');
		}
	}

	$('.pagination-bitcoin li a').stop(true, true).hover(function(event){
		pause = true;
		clearTimeout(interval_bitcoin);
	},function(){
		pause = false;
		clearTimeout(interval_bitcoin);
		runSliderBitcoin(current);
	});

	$('.pagination-bitcoin li a').stop(true, true).click(function(event){
		clearTimeout(interval_bitcoin);
		pause = false;
		event.preventDefault();
		var current = $(this).parent().index();
		runSliderBitcoin(current);
	});