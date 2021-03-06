
Chart.defaults.global = {
	    // Boolean - Whether to animate the chart
	    animation: true,
	
	    // Number - Number of animation steps
	    animationSteps: 60,
	
	    // String - Animation easing effect
	    // Possible effects are:
	    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
	    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
	    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
	    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
	    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
	    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
	    //  easeOutElastic, easeInCubic]
	    animationEasing: "easeOutQuart",
	
	    // Boolean - If we should show the scale at all
	    showScale: true,
	
	    // Boolean - If we want to override with a hard coded scale
	    scaleOverride: false,
	
	    // ** Required if scaleOverride is true **
	    // Number - The number of steps in a hard coded scale
	    scaleSteps: null,
	    // Number - The value jump in the hard coded scale
	    scaleStepWidth: null,
	    // Number - The scale starting value
	    scaleStartValue: null,
	
	    // String - Colour of the scale line
	    scaleLineColor: "rgba(0,0,0,.1)",
	
	    // Number - Pixel width of the scale line
	    scaleLineWidth: 1,
	
	    // Boolean - Whether to show labels on the scale
	    scaleShowLabels: true,
	
	    // Interpolated JS string - can access value
	    scaleLabel: "<%=value%>",
	
	    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
	    scaleIntegersOnly: true,
	
	    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	    scaleBeginAtZero: false,
	
	    // String - Scale label font declaration for the scale label
	    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
	
	    // Number - Scale label font size in pixels
	    scaleFontSize: 12,
	
	    // String - Scale label font weight style
	    scaleFontStyle: "normal",
	
	    // String - Scale label font colour
	    scaleFontColor: "#666",
	
	    // Boolean - whether or not the chart should be responsive and resize when the browser does.
	    responsive: false,
	
	    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
	    maintainAspectRatio: true,
	
	    // Boolean - Determines whether to draw tooltips on the canvas or not
	    showTooltips: true,
	
	    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
	    customTooltips: false,
	
	    // Array - Array of string names to attach tooltip events
	    tooltipEvents: ["mousemove", "touchstart", "touchmove"],
	
	    // String - Tooltip background colour
	    tooltipFillColor: "rgba(0,0,0,0.8)",
	
	    // String - Tooltip label font declaration for the scale label
	    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
	
	    // Number - Tooltip label font size in pixels
	    tooltipFontSize: 14,
	
	    // String - Tooltip font weight style
	    tooltipFontStyle: "normal",
	
	    // String - Tooltip label font colour
	    tooltipFontColor: "#fff",
	
	    // String - Tooltip title font declaration for the scale label
	    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
	
	    // Number - Tooltip title font size in pixels
	    tooltipTitleFontSize: 14,
	
	    // String - Tooltip title font weight style
	    tooltipTitleFontStyle: "bold",
	
	    // String - Tooltip title font colour
	    tooltipTitleFontColor: "#fff",
	
	    // Number - pixel width of padding around tooltip text
	    tooltipYPadding: 6,
	
	    // Number - pixel width of padding around tooltip text
	    tooltipXPadding: 6,
	
	    // Number - Size of the caret on the tooltip
	    tooltipCaretSize: 8,
	
	    // Number - Pixel radius of the tooltip border
	    tooltipCornerRadius: 6,
	
	    // Number - Pixel offset from point x to tooltip edge
	    tooltipXOffset: 10,
	
	    // String - Template string for single tooltips
	    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
	
	    // String - Template string for multiple tooltips
	    multiTooltipTemplate: "<%= value %>",
	
	    // Function - Will fire on animation progression.
	    onAnimationProgress: function(){},
	
	    // Function - Will fire on animation completion.
	    onAnimationComplete: function(){}
	};



// Some global variables
var monthNames = [	"January", 
				"February", 
				"March", 
				"April", 
				"May", 
				"June",
				"July", 
				"August", 
				"September", 
				"October", 
				"November", 
				"December"];

// Create a hashmap with months

var priceCumulative = {	"January": 0, 
						"February": 0, 
						"March": 0, 
						"April": 0, 
						"May": 0, 
						"June": 0,
						"July": 0, 
						"August": 0, 
						"September": 0, 
						"October": 0, 
						"November": 0, 
						"December": 0 
					};
	

var priceAverages = 	{	"January": {
									"priceCumulative": 0,
									"count": 0
								},  
						"February": {
									"priceCumulative": 0,
									"count": 0
								}, 
						"March": {
									"priceCumulative": 0,
									"count": 0
								}, 
						"April": {
									"priceCumulative": 0,
									"count": 0
								}, 
						"May": {
									"priceCumulative": 0,
									"count": 0
								}, 
						"June": {
									"priceCumulative": 0,
									"count": 0
								},
						"July": {
									"priceCumulative": 0,
									"count": 0
								}, 
						"August": {
									"priceCumulative": 0,
									"count": 0
								}, 
						"September": {
									"priceCumulative": 0,
									"count": 0
								},
						"October": {
									"priceCumulative": 0,
									"count": 0
								}, 
						"November": {
									"priceCumulative": 0,
									"count": 0
								}, 
						"December": {
									"priceCumulative": 0,
									"count": 0
								}
					};




$(document).ready(function(){
	

		

	$.getJSON("data/booli_Karlstad.json", function(booli_json){
		
		console.log(booli_json);
		
		linechart_data = jsonToLineChart(booli_json);
		
		console.log(linechart_data);
		
		
		// Get the context of the canvas element we want to select
		var ctx = document.getElementById("chart_bestMonthOfYear").getContext("2d");
		var myLineChart = new Chart(ctx).Line(linechart_data);

		
	});	

});



function jsonToLineChart(booli_json){
	
	var parameters = booli_json.searchParameters; 
	
	if(parameters.status == "sold"){ 
	
		var soldObjects = booli_json.housingObjects;
		var soldDates = [];
		var soldPrices = [];
		var soldPricesAverages = [];
		
		$.each(soldObjects, function(index, soldObject){
			
			var soldDate = soldObject.soldDate;
			var soldPrice = soldObject.soldPrice;
			
			var date = new Date(soldDate);
			var locale = "eng-us";
			var month = date.toLocaleString(locale, {month: "long"});
			
			priceCumulative[month] = priceCumulative[month] + soldPrice;  
			
			
			priceAverages[month].priceCumulative = priceAverages[month].priceCumulative + soldPrice;
			priceAverages[month].count = priceAverages[month].count + 1;
			
			//console.log(month);
			//console.log(priceAverages[month].priceCumulative);
			//console.log(priceAverages[month].count);
			
			//console.log("pricePerMonth");
			//console.log(month);
			//console.log(priceCumulative[month]);
			
			
			soldDates.push(soldDate);
			soldPrices.push(soldPrice);
			
		});
	
		console.log("MONTHS");
	
		var priceCumulativePerMonth = {};
		var priceAveragesPerMonth = {};
		
		
		//console.log(soldDates);
		
		$.each( priceCumulative, function( month, price ) {
			priceCumulativePerMonth[month] = price / 12;
			
			console.log("PriceCumulative");
			console.log(month);
			console.log(price);
			console.log(priceCumulativePerMonth[month]); 
		});	
		
		
		$.each( priceAverages, function( month, priceAverage ) {
			priceAveragesPerMonth[month] = priceAverage.priceCumulative / priceAverage.count;
			
			console.log("PriceAverages");
			console.log(month);
			console.log(priceAverage.priceCumulative);
			console.log(priceAverage.count); 
		});	
		
		
		
		var data = {
		    labels: monthNames
		    ,datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(220,220,220,0.2)",
		            strokeColor: "rgba(220,220,220,1)",
		            pointColor: "rgba(220,220,220,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: priceAveragesPerMonth
		        }/*,
		        {
		            label: "My Second dataset",
		            fillColor: "rgba(151,187,205,0.2)",
		            strokeColor: "rgba(151,187,205,1)",
		            pointColor: "rgba(151,187,205,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(151,187,205,1)",
		            data: priceAveragesPerMonth
		        }
		        */
		    ]
		};	
		return data;	
	}
		
};



function chartGlobalOptions(){
	
};