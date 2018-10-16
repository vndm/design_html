var chartHeight = 400;
var chartWidth = parseInt($('#chartConatiner').css('width'));

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

TradingView.onready(function() {
    var widget = window.tvWidget = new TradingView.widget({
        interval: '30',
        width: chartWidth,
        height: chartHeight,
        symbol: Market.replace('-',''),
        container_id: "chartConatiner",
        datafeed: new Datafeeds.UDFCompatibleDatafeed("https://chart.vndm.io", 3000),
        library_path: "c-h-a-r-t/library/",
        locale: "vi",
        hideideas: true,
        studies: [
            "BB@tv-basicstudies",
            "MACD@tv-basicstudies"
        ],
        favorites: {
            intervals: ["30", "120", "1D"]
        }

    });
    widget.onChartReady(function() {
        widget.chart().createStudy("Bollinger Bands", false, false, [
            10 + parseInt(Math.random() * 10),
            3 + parseInt(Math.random() * 3)
        ]);

        widget.chart().createStudy('Stochastic', false, false, [14, 3, 1], null, {
            "%d.color": "#000000",
            "%k.color": "#00FF00"
        });
    });
});