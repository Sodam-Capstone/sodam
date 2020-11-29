// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["A", "B", "C", "D"],
    datasets: [{
      data: [12.21, 15.58, 11.25, 8.32],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
});


var ctx1 = document.getElementById("myPieChart1");
var myPieChart1 = new Chart(ctx1, {
  type: 'pie',
  data: {
    labels: ["가", "나", "다", "라"],
    datasets: [{
      data: [15.21, 11.58, 11.25, 8.32],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
});


var ctx2 = document.getElementById("myPieChart2");
var myPieChart2 = new Chart(ctx2, {
  type: 'pie',
  data: {
    labels: ["마", "바", "사", "자"],
    datasets: [{
      data: [15.21, 11.58, 11.25, 8.32],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
});

var ctx3 = document.getElementById("myPieChart3");
var myPieChart3 = new Chart(ctx3, {
  type: 'pie',
  data: {
    labels: ["아", "자", "차", "카"],
    datasets: [{
      data: [15.21, 11.58, 11.25, 8.32],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
});


var ctx4 = document.getElementById("myPieChart4");
var myPieChart4 = new Chart(ctx4, {
  type: 'pie',
  data: {
    labels: ["타", "파", "하", "가"],
    datasets: [{
      data: [15.21, 11.58, 11.25, 8.32],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
});



/***********************/

var ctx3 = document.getElementById("pieChart");
var pie = new d3pie(ctx3, {
	"header": {
		"title": {
			"text": "전체 감성 분석",
			"fontSize": 19,
			"font": "verdana"
		},
		"subtitle": {
			"text": "회의의 감정 비율",
			"color": "#999999",
			"fontSize": 11,
			"font": "verdana"
		},
		"titleSubtitlePadding": 12
	},
	"footer": {
		"text": "소담 : 소리를 담다, 감정 분석 사이트",
		"color": "#999999",
		"fontSize": 11,
		"font": "open sans",
		"location": "bottom-center"
	},
	"size": {
		"canvasHeight": 400,
		"canvasWidth": 590,
		"pieOuterRadius": "80%"
	},
	"data": {
		"content": [
			{
				"label": "memberA",
				"value": 8,
				"color": "#ff9292"
			},
			{
				"label": "memberB",
				"value": 5,
				"color": "#66b7e2"
			},
			{
				"label": "memberC",
				"value": 2,
				"color": "#e8c172"
			},
			{
				"label": "memberD",
				"value": 3,
				"color": "#b0cd87"
			}
		]
	},
	"labels": {
		"outer": {
			"pieDistance": 31
		},
		"mainLabel": {
			"font": "verdana"
		},
		"percentage": {
			"color": "#e1e1e1",
			"font": "verdana",
			"decimalPlaces": 0
		},
		"value": {
			"color": "#e1e1e1",
			"font": "verdana"
		},
		"lines": {
			"enabled": true,
			"color": "#cccccc"
		},
		"truncation": {
			"enabled": true
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	}
});