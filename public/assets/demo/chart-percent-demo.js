

// 회의 전체 4가지 감정 비율 퍼센트
var ctx = document.getElementById("화남");
var myChart = new Chart(ctx, {
type: 'doughnut',
data: {
    labels: ['화남'],
    datasets: [{
        data: [20, 80],
        backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 99, 132, 0.1)',
        ],
        borderWidth: 0
    }]
},
options: {
    responsive: false,
    cutoutPercentage: 95,
    events: [],
    legend: {
        labels: {
            boxWidth: 0,
            fontSize: 20,
            fontColor: 'rgba(0,0,0, 0.80)',
        },
        position: 'bottom'
    }
},
});

var ctx2 = document.getElementById("무감정");
var myChart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['무감정'],
        datasets: [{
            data: [40, 60],
            backgroundColor: [
                'rgba(255, 193, 7, 0.8)',
                'rgba(255, 193, 7, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var ctx3 = document.getElementById("슬픔");
var myChart3 = new Chart(ctx3, {
    type: 'doughnut',
    data: {
        labels: ['슬픔'],
        datasets: [{
            data: [30, 70],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var ctx4 = document.getElementById("기쁨");
var myChart4 = new Chart(ctx4, {
    type: 'doughnut',
    data: {
        labels: ['기쁨'],
        datasets: [{
            data: [10, 90],
            backgroundColor: [
                'rgba(40, 167, 69, 0.8)',
                'rgba(40, 167, 69, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var charts = [{
              current: myChart
            , text: '20%'
            }, {
              current: myChart2
            , text: '40%'
            }, {
              current: myChart3
            , text: '30%'
            }, {
              current: myChart4
            , text: '10%'
            }];

Chart.pluginService.register({
    beforeDraw: function(chart) {
        for (var iterator of charts) {
            var width = iterator.current.chart.width,
                height = iterator.current.chart.height,
                ctx = iterator.current.chart.ctx;
                var fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em lato";
                ctx.fillStyle = "rgba(0,0,0, 0.85)"
                ctx.textBaseline = "middle";
                var text = iterator.text,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2.5;
                ctx.fillText(text, textX, textY);
                ctx.save();
        }
    }
});



// 회의 전체 4명의 참여 비율 퍼센트
var sctx = document.getElementById("A");
var smyChart = new Chart(sctx, {
type: 'doughnut',
data: {
    labels: ['참여자A'],
    datasets: [{
        data: [60, 40],
        backgroundColor: [
            'rgba(67, 91, 189, 0.8)',
            'rgba(67, 91, 189, 0.1)',
        ],
        borderWidth: 0
    }]
},
options: {
    responsive: false,
    cutoutPercentage: 95,
    events: [],
    legend: {
        labels: {
            boxWidth: 0,
            fontSize: 20,
            fontColor: 'rgba(0,0,0, 0.80)',
        },
        position: 'bottom'
    }
},
});
var sctx2 = document.getElementById("B");
var smyChart2 = new Chart(sctx2, {
    type: 'doughnut',
    data: {
        labels: ['참여자B'],
        datasets: [{
            data: [70, 30],
            backgroundColor: [
                'rgba(67, 91, 189, 0.8)',
                'rgba(67, 91, 189, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});
var sctx3 = document.getElementById("C");
var smyChart3 = new Chart(sctx3, {
    type: 'doughnut',
    data: {
        labels: ['참여자C'],
        datasets: [{
            data: [90, 10],
            backgroundColor: [
                'rgba(67, 91, 189, 0.8)',
                'rgba(67, 91, 189, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});
var sctx4 = document.getElementById("D");
var smyChart4 = new Chart(sctx4, {
    type: 'doughnut',
    data: {
        labels: ['참여자D'],
        datasets: [{
            data: [80, 20],
            backgroundColor: [
                'rgba(67, 91, 189, 0.8)',
                'rgba(67, 91, 189, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var scharts = [{
              current: smyChart
            , text: '60점'
            }, {
              current: smyChart2
            , text: '70점'
            }, {
              current: smyChart3
            , text: '90점'
            }, {
              current: smyChart4
            , text: '80점'
            }];

Chart.pluginService.register({
    beforeDraw: function(schart) {
        for (var iterator of scharts) {
            var width = iterator.current.chart.width,
                height = iterator.current.chart.height,
                ctx = iterator.current.chart.ctx;
                var fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em lato";
                ctx.fillStyle = "rgba(0,0,0, 0.85)"
                ctx.textBaseline = "middle";
                var text = iterator.text,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2.5;
                ctx.fillText(text, textX, textY);
                ctx.save();
        }
    }
});





//// 참여자 A~D의 감정

// 참여자 A의 4가지 감정
var Actx = document.getElementById("화남A");
var AChart = new Chart(Actx, {
type: 'doughnut',
data: {
    labels: ['화남'],
    datasets: [{
        data: [20, 80],
        backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 99, 132, 0.1)',
        ],
        borderWidth: 0
    }]
},
options: {
    responsive: false,
    cutoutPercentage: 95,
    events: [],
    legend: {
        labels: {
            boxWidth: 0,
            fontSize: 20,
            fontColor: 'rgba(0,0,0, 0.80)',
        },
        position: 'bottom'
    }
},
});

var Actx2 = document.getElementById("무감정A");
var AChart2 = new Chart(Actx2, {
    type: 'doughnut',
    data: {
        labels: ['무감정'],
        datasets: [{
            data: [40, 60],
            backgroundColor: [
                'rgba(255, 193, 7, 0.8)',
                'rgba(255, 193, 7, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var Actx3 = document.getElementById("슬픔A");
var AChart3 = new Chart(Actx3, {
    type: 'doughnut',
    data: {
        labels: ['슬픔'],
        datasets: [{
            data: [30, 70],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var Actx4 = document.getElementById("기쁨A");
var AChart4 = new Chart(Actx4, {
    type: 'doughnut',
    data: {
        labels: ['기쁨'],
        datasets: [{
            data: [10, 90],
            backgroundColor: [
                'rgba(40, 167, 69, 0.8)',
                'rgba(40, 167, 69, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var Acharts = [{
              current: AChart
            , text: '20%'
            }, {
              current: AChart2
            , text: '40%'
            }, {
              current: AChart3
            , text: '30%'
            }, {
              current: AChart4
            , text: '10%'
            }];

Chart.pluginService.register({
    beforeDraw: function(chart) {
        for (var iterator of Acharts) {
            var width = iterator.current.chart.width,
                height = iterator.current.chart.height,
                ctx = iterator.current.chart.ctx;
                var fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em lato";
                ctx.fillStyle = "rgba(0,0,0, 0.85)"
                ctx.textBaseline = "middle";
                var text = iterator.text,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2.5;
                ctx.fillText(text, textX, textY);
                ctx.save();
        }
    }
});


// 참여자 B의 4가지 감정
var Bctx = document.getElementById("화남B");
var BChart = new Chart(Bctx, {
type: 'doughnut',
data: {
    labels: ['화남'],
    datasets: [{
        data: [20, 80],
        backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 99, 132, 0.1)',
        ],
        borderWidth: 0
    }]
},
options: {
    responsive: false,
    cutoutPercentage: 95,
    events: [],
    legend: {
        labels: {
            boxWidth: 0,
            fontSize: 20,
            fontColor: 'rgba(0,0,0, 0.80)',
        },
        position: 'bottom'
    }
},
});

var Bctx2 = document.getElementById("무감정B");
var BChart2 = new Chart(Bctx2, {
    type: 'doughnut',
    data: {
        labels: ['무감정'],
        datasets: [{
            data: [40, 60],
            backgroundColor: [
                'rgba(255, 193, 7, 0.8)',
                'rgba(255, 193, 7, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var Bctx3 = document.getElementById("슬픔B");
var BChart3 = new Chart(Bctx3, {
    type: 'doughnut',
    data: {
        labels: ['슬픔'],
        datasets: [{
            data: [30, 70],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var Bctx4 = document.getElementById("기쁨B");
var BChart4 = new Chart(Bctx4, {
    type: 'doughnut',
    data: {
        labels: ['기쁨'],
        datasets: [{
            data: [10, 90],
            backgroundColor: [
                'rgba(40, 167, 69, 0.8)',
                'rgba(40, 167, 69, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var Bcharts = [{
              current: BChart
            , text: '20%'
            }, {
              current: BChart2
            , text: '40%'
            }, {
              current: BChart3
            , text: '30%'
            }, {
              current: BChart4
            , text: '10%'
            }];

Chart.pluginService.register({
    beforeDraw: function(chart) {
        for (var iterator of Bcharts) {
            var width = iterator.current.chart.width,
                height = iterator.current.chart.height,
                ctx = iterator.current.chart.ctx;
                var fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em lato";
                ctx.fillStyle = "rgba(0,0,0, 0.85)"
                ctx.textBaseline = "middle";
                var text = iterator.text,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2.5;
                ctx.fillText(text, textX, textY);
                ctx.save();
        }
    }
});



// 참여자 C의 4가지 감정
var Cctx = document.getElementById("화남C");
var CChart = new Chart(Cctx, {
type: 'doughnut',
data: {
    labels: ['화남'],
    datasets: [{
        data: [20, 80],
        backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 99, 132, 0.1)',
        ],
        borderWidth: 0
    }]
},
options: {
    responsive: false,
    cutoutPercentage: 95,
    events: [],
    legend: {
        labels: {
            boxWidth: 0,
            fontSize: 20,
            fontColor: 'rgba(0,0,0, 0.80)',
        },
        position: 'bottom'
    }
},
});

var Cctx2 = document.getElementById("무감정C");
var CChart2 = new Chart(Cctx2, {
    type: 'doughnut',
    data: {
        labels: ['무감정'],
        datasets: [{
            data: [40, 60],
            backgroundColor: [
                'rgba(255, 193, 7, 0.8)',
                'rgba(255, 193, 7, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var Cctx3 = document.getElementById("슬픔C");
var CChart3 = new Chart(Cctx3, {
    type: 'doughnut',
    data: {
        labels: ['슬픔'],
        datasets: [{
            data: [30, 70],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var Cctx4 = document.getElementById("기쁨C");
var CChart4 = new Chart(Cctx4, {
    type: 'doughnut',
    data: {
        labels: ['기쁨'],
        datasets: [{
            data: [10, 90],
            backgroundColor: [
                'rgba(40, 167, 69, 0.8)',
                'rgba(40, 167, 69, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var Ccharts = [{
              current: CChart
            , text: '20%'
            }, {
              current: CChart2
            , text: '40%'
            }, {
              current: CChart3
            , text: '30%'
            }, {
              current: CChart4
            , text: '10%'
            }];

Chart.pluginService.register({
    beforeDraw: function(chart) {
        for (var iterator of Ccharts) {
            var width = iterator.current.chart.width,
                height = iterator.current.chart.height,
                ctx = iterator.current.chart.ctx;
                var fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em lato";
                ctx.fillStyle = "rgba(0,0,0, 0.85)"
                ctx.textBaseline = "middle";
                var text = iterator.text,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2.5;
                ctx.fillText(text, textX, textY);
                ctx.save();
        }
    }
});



// 참여자 D의 4가지 감정
var Dctx = document.getElementById("화남D");
var DChart = new Chart(Dctx, {
type: 'doughnut',
data: {
    labels: ['화남'],
    datasets: [{
        data: [20, 80],
        backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 99, 132, 0.1)',
        ],
        borderWidth: 0
    }]
},
options: {
    responsive: false,
    cutoutPercentage: 95,
    events: [],
    legend: {
        labels: {
            boxWidth: 0,
            fontSize: 20,
            fontColor: 'rgba(0,0,0, 0.80)',
        },
        position: 'bottom'
    }
},
});

var Dctx2 = document.getElementById("무감정D");
var DChart2 = new Chart(Dctx2, {
    type: 'doughnut',
    data: {
        labels: ['무감정'],
        datasets: [{
            data: [40, 60],
            backgroundColor: [
                'rgba(255, 193, 7, 0.8)',
                'rgba(255, 193, 7, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var Dctx3 = document.getElementById("슬픔D");
var DChart3 = new Chart(Dctx3, {
    type: 'doughnut',
    data: {
        labels: ['슬픔'],
        datasets: [{
            data: [30, 70],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var Dctx4 = document.getElementById("기쁨D");
var DChart4 = new Chart(Dctx4, {
    type: 'doughnut',
    data: {
        labels: ['기쁨'],
        datasets: [{
            data: [10, 90],
            backgroundColor: [
                'rgba(40, 167, 69, 0.8)',
                'rgba(40, 167, 69, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 95,
        events: [],
        legend: {
            labels: {
                boxWidth: 0,
                fontSize: 20,
                fontColor: 'rgba(0,0,0, 0.80)',
            },
            position: 'bottom'
        }
    },
});

var Dcharts = [{
              current: DChart
            , text: '20%'
            }, {
              current: DChart2
            , text: '40%'
            }, {
              current: DChart3
            , text: '30%'
            }, {
              current: DChart4
            , text: '10%'
            }];

Chart.pluginService.register({
    beforeDraw: function(chart) {
        for (var iterator of Dcharts) {
            var width = iterator.current.chart.width,
                height = iterator.current.chart.height,
                ctx = iterator.current.chart.ctx;
                var fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em lato";
                ctx.fillStyle = "rgba(0,0,0, 0.85)"
                ctx.textBaseline = "middle";
                var text = iterator.text,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2.5;
                ctx.fillText(text, textX, textY);
                ctx.save();
        }
    }
});
