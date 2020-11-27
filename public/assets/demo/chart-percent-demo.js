

var donutOptions = {
  responsive: false,
  cutoutPercentage: 95,
  legend: {
      labels: {
          boxWidth: 0,
          fontSize: 20,
          fontColor: 'rgba(0,0,0, 0.80)',
      },
      position: 'bottom'
    }
};
// 회의 전체 4가지 감정 비율 퍼센트
var ctx = document.getElementById('angera');
var ctx2 = document.getElementById("neutral");
var ctx3 = document.getElementById("sad");
var ctx4 = document.getElementById("happy");
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
options: donutOptions});

alert('a');


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









// ///////////차트



// var senti_value = 40;
// var parti_value = 60;

// var senti_data = {
//   labels: [
//     "My val",
//     ""
//   ],
//   datasets: [
//     {
//       data: [senti_value, 100-senti_value],
//       backgroundColor: [
//         "#FF6384",
//         "#AAAAAA"
//       ],
//       hoverBackgroundColor: [
//         "#FF6384",
//         "#AAAAAA"
//       ],
//       hoverBorderColor: [
//         "#FF6384",
//         "#ffffff"
//       ]
//     }]
// };

// var parti_data = {
//   labels: [
//     "My val",
//     ""
//   ],
//   datasets: [
//     {
//       data: [parti_value, 100-parti_value],
//       backgroundColor: [
//         "#FF6384",
//         "#AAAAAA"
//       ],
//       hoverBackgroundColor: [
//         "#FF6384",
//         "#AAAAAA"
//       ],
//       hoverBorderColor: [
//         "#FF6384",
//         "#ffffff"
//       ]
//     }]
// };

// var myChart = new Chart(document.getElementById('myChart'), {
//     type: 'doughnut',
//     data: senti_data,
//     options: {
//         responsive: true,
//       legend: {
//         display: false
//       },
//       cutoutPercentage: 80,
//       tooltips: {
//           filter: function(item, senti_data) {
//           var label = senti_data.labels[item.index];
//           if (label) return item;
//         }
//       }
//     }
//   });

// if(myChart){
//   textCenter(senti_value);

//   function textCenter(val) {
//     Chart.pluginService.register({
//       beforeDraw: function(chart) {
//         var width = chart.chart.width,
//             height = chart.chart.height,
//             ctx = chart.chart.ctx;

//         ctx.restore();
//         var fontSize = (height / 114).toFixed(2);
//         ctx.font = fontSize + "em sans-serif";
//         ctx.textBaseline = "middle";

//         var text = val+"점",
//             textX = Math.round((width - ctx.measureText(text).width) / 2),
//             textY = height / 2;

//         ctx.fillText(text, textX, textY);
//         ctx.save();
//       }
//     });
//   }
// }




// // 차트 2
//   var myChart2 = new Chart(document.getElementById('myChart2'), {
//     type: 'doughnut',
//     data: parti_data,
//     options: {
//         responsive: true,
//       legend: {
//         display: false
//       },
//       cutoutPercentage: 80,
//       tooltips: {
//           filter: function(item, parti_data) {
//           var label = parti_data.labels[item.index];
//           if (label) return item;
//         }
//       }
//     }
//   });

// if(myChart2){
//   textCenter(parti_value);

//   function textCenter(val) {
//     Chart.pluginService.register({
//       beforeDraw: function(chart) {
//         var width = chart.chart.width,
//             height = chart.chart.height,
//             ctx = chart.chart.ctx;

//         ctx.restore();
//         var fontSize = (height / 114).toFixed(2);
//         ctx.font = fontSize + "em sans-serif";
//         ctx.textBaseline = "middle";

//         var text = val+"점",
//             textX = Math.round((width - ctx.measureText(text).width) / 2),
//             textY = height / 2;

//         ctx.fillText(text, textX, textY);
//         ctx.save();
//       }
//     });
//   }
// }
