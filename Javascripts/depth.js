AmCharts.translations.dataLoader = Language['LOADING'];

var chart = AmCharts.makeChart("depthContainer", {
	"type": "serial",
	"theme": "light",
	"dataLoader": {
		"url": "/c-h-a-r-t/depth?symbol=" + Market,
		"format": "json",
		"reload": 3,
		"showCurtain": false,
		"postProcess": function(data) {

			// Function to process (sort and calculate cummulative volume)
			function processData(list, type, desc) {

				// Convert to data points
				for (var i = 0; i < list.length; i++) {
					list[i] = {
						value: Number(list[i].price),
						volume: Number(list[i].amount),
					}
				}

				// Sort list just in case
				list.sort(function(a, b) {
					if (a.value > b.value) {
						return 1;
					} else if (a.value < b.value) {
						return -1;
					} else {
						return 0;
					}
				});

				// Calculate cummulative volume
				if (desc) {
					for (var i = list.length - 1; i >= 0; i--) {
						if (i < (list.length - 1)) {
							list[i].totalvolume = list[i + 1].totalvolume + list[i].volume;
						} else {
							list[i].totalvolume = list[i].volume;
						}
						var dp = {};
						dp["value"] = list[i].value;
						dp[type + "volume"] = list[i].volume;
						dp[type + "totalvolume"] = list[i].totalvolume;
						res.unshift(dp);
					}
				} else {
					for (var i = 0; i < list.length; i++) {
						if (i > 0) {
							list[i].totalvolume = list[i - 1].totalvolume + list[i].volume;
						} else {
							list[i].totalvolume = list[i].volume;
						}
						var dp = {};
						dp["value"] = list[i].value;
						dp[type + "volume"] = list[i].volume;
						dp[type + "totalvolume"] = list[i].totalvolume;
						res.push(dp);
					}
				}

			}

			// Init
			var res = [];
			processData(data.bids, "bids", true);
			processData(data.asks, "asks", false);

			return res;
		}
	},
	"graphs": [{
		"id": "bids",
		"fillAlphas": 0.1,
		"lineAlpha": 1,
		"lineThickness": 2,
		"lineColor": "#0f0",
		"type": "step",
		"valueField": "bidstotalvolume",
		"balloonFunction": balloon
	}, {
		"id": "asks",
		"fillAlphas": 0.1,
		"lineAlpha": 1,
		"lineThickness": 2,
		"lineColor": "#f00",
		"type": "step",
		"valueField": "askstotalvolume",
		"balloonFunction": balloon
	}, {
		"lineAlpha": 0,
		"fillAlphas": 0.2,
		"lineColor": "#000",
		"type": "column",
		"clustered": false,
		"valueField": "bidsvolume",
		"showBalloon": false
	}, {
		"lineAlpha": 0,
		"fillAlphas": 0.2,
		"lineColor": "#000",
		"type": "column",
		"clustered": false,
		"valueField": "asksvolume",
		"showBalloon": false
	}],
	"categoryField": "value",
	"chartCursor": {},
	"balloon": {
		"textAlign": "left"
	}
});

function formatNumber(val, chart, precision) {
	return AmCharts.formatNumber(
		val, {
			precision: precision ? precision : chart.precision,
			decimalSeparator: chart.decimalSeparator,
			thousandsSeparator: chart.thousandsSeparator
		}
	);
}

function balloon(item, graph)
{
	if (graph.id == "asks")
	{
		return	$('#depthContainer').data('balloon-ask')
				.replace('[Price]',formatNumber(item.dataContext.value, graph.chart, Decimal['QUOTE']))
				.replace('[Volume]',formatNumber(item.dataContext.asksvolume, graph.chart, Decimal['BASE']))
				.replace('[Total]',formatNumber(item.dataContext.askstotalvolume, graph.chart, Decimal['BASE']));
	}
	else
	{
		return	$('#depthContainer').data('balloon-bid')
				.replace('[Price]',formatNumber(item.dataContext.value, graph.chart, Decimal['QUOTE']))
				.replace('[Volume]',formatNumber(item.dataContext.bidsvolume, graph.chart, Decimal['BASE']))
				.replace('[Total]',formatNumber(item.dataContext.bidstotalvolume, graph.chart, Decimal['BASE']));
	}
}
