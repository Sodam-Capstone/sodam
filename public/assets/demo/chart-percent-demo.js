
var options = {
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
};
// 회의 전체 4가지 감정 비율 퍼센트
var ctx = document.getElementById("화남");
var total = document.getElementById("total").value;
var data_total = new Array();
data_total = total.split(',');

var myChart = new Chart(ctx, {
type: 'doughnut',
data: {
    labels: ['화남'],
    datasets: [{
        data: [data_total[0], 100-data_total[0]],
        backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 99, 132, 0.1)',
        ],
        borderWidth: 0
    }]
},
options: options,
});

var ctx2 = document.getElementById("무감정");
var myChart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['무감정'],
        datasets: [{
            data: [data_total[1], 100-data_total[1]],
            backgroundColor: [
                'rgba(255, 193, 7, 0.8)',
                'rgba(255, 193, 7, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: options,
});

var ctx3 = document.getElementById("슬픔");
var myChart3 = new Chart(ctx3, {
    type: 'doughnut',
    data: {
        labels: ['슬픔'],
        datasets: [{
            data: [data_total[2], 100-data_total[2]],
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(54, 162, 235, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: options,
});

var ctx4 = document.getElementById("기쁨");
var myChart4 = new Chart(ctx4, {
    type: 'doughnut',
    data: {
        labels: ['기쁨'],
        datasets: [{
            data: [data_total[3], 100-data_total[3]],
            backgroundColor: [
                'rgba(40, 167, 69, 0.8)',
                'rgba(40, 167, 69, 0.1)',
            ],
            borderWidth: 0
        }]
    },
    options: options,
});

var charts = [{
              current: myChart
            , text: data_total[0]+'%'
            }, {
              current: myChart2
            , text: data_total[1]+'%'
            }, {
              current: myChart3
            , text: data_total[2]+'%'
            }, {
              current: myChart4
            , text: data_total[3]+'%'
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



//// 참여자 A~D의 감정

// 참여자 A의 4가지 감정
var Actx = document.getElementById("화남A");
if (Actx) {
  var Actx2 = document.getElementById("무감정A");
  var Actx3 = document.getElementById("슬픔A");
  var Actx4 = document.getElementById("기쁨A");
  var member1 = document.getElementById('member1').value;
  var data_A = member1.split(',');
  var AChart = new Chart(Actx, {
      type: 'doughnut',
      data: {
          labels: ['화남'],
          datasets: [{
              data: [data_A[0], 100-data_A[0]],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(255, 99, 132, 0.1)',
              ],
              borderWidth: 0
          }]
        },
        options: options,
  });

  var AChart2 = new Chart(Actx2, {
      type: 'doughnut',
      data: {
          labels: ['무감정'],
          datasets: [{
              data: [data_A[1], 100-data_A[1]],
              backgroundColor: [
                  'rgba(255, 193, 7, 0.8)',
                  'rgba(255, 193, 7, 0.1)',
              ],
              borderWidth: 0
          }]
      },
      options: options,
  });

  var AChart3 = new Chart(Actx3, {
      type: 'doughnut',
      data: {
          labels: ['슬픔'],
          datasets: [{
              data: [data_A[2], 100-data_A[2]],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(54, 162, 235, 0.1)',
              ],
              borderWidth: 0
          }]
      },
      options: options,
  });

  var AChart4 = new Chart(Actx4, {
      type: 'doughnut',
      data: {
          labels: ['기쁨'],
          datasets: [{
              data: [data_A[3], 100-data_A[3]],
              backgroundColor: [
                  'rgba(40, 167, 69, 0.8)',
                  'rgba(40, 167, 69, 0.1)',
              ],
              borderWidth: 0
          }]
      },
      options: options,
  });

  var Acharts = [{
                current: AChart
              , text: data_A[0]+'%'
              }, {
                current: AChart2
              , text: data_A[1]+'%'
              }, {
                current: AChart3
              , text: data_A[2]+'%'
              }, {
                current: AChart4
              , text: data_A[3]+'%'
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
}

// 참여자 B의 4가지 감정
var Bctx = document.getElementById("화남B");
if (Bctx) {
  var Bctx2 = document.getElementById("무감정B");
  var Bctx3 = document.getElementById("슬픔B");
  var Bctx4 = document.getElementById("기쁨B");
  var member2 = document.getElementById('member2').value;
  var data_B = member2.split(',');
  var BChart = new Chart(Bctx, {
      type: 'doughnut',
      data: {
          labels: ['화남'],
          datasets: [{
              data: [data_B[0], 100-data_B[0]],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(255, 99, 132, 0.1)',
              ],
              borderWidth: 0
          }]
        },
        options: options,
  });

  var BChart2 = new Chart(Bctx2, {
      type: 'doughnut',
      data: {
          labels: ['무감정'],
          datasets: [{
              data: [data_B[1], 100-data_B[1]],
              backgroundColor: [
                  'rgba(255, 193, 7, 0.8)',
                  'rgba(255, 193, 7, 0.1)',
              ],
              borderWidth: 0
          }]
      },
      options: options,
  });

  var BChart3 = new Chart(Bctx3, {
      type: 'doughnut',
      data: {
          labels: ['슬픔'],
          datasets: [{
              data: [data_B[2], 100-data_B[2]],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(54, 162, 235, 0.1)',
              ],
              borderWidth: 0
          }]
      },
      options: options,
  });

  var BChart4 = new Chart(Bctx4, {
      type: 'doughnut',
      data: {
          labels: ['기쁨'],
          datasets: [{
              data: [data_B[3], 100-data_B[3]],
              backgroundColor: [
                  'rgba(40, 167, 69, 0.8)',
                  'rgba(40, 167, 69, 0.1)',
              ],
              borderWidth: 0
          }]
      },
      options: options,
  });

  var Bcharts = [{
                current: BChart
              , text: data_B[0]+'%'
              }, {
                current: BChart2
              , text: data_B[1]+'%'
              }, {
                current: BChart3
              , text: data_B[2]+'%'
              }, {
                current: BChart4
              , text: data_B[3]+'%'
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
}
// 참여자 C의 4가지 감정
var Cctx = document.getElementById("화남C");
if (Cctx) {
  var Cctx2 = document.getElementById("무감정C");
  var Cctx3 = document.getElementById("슬픔C");
  var Cctx4 = document.getElementById("기쁨C");
  var member3 = document.getElementById('member3').value;
  var data_C = member3.split(',');
  var CChart = new Chart(Cctx, {
      type: 'doughnut',
      data: {
          labels: ['화남'],
          datasets: [{
              data: [data_C[0], 100-data_C[0]],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(255, 99, 132, 0.1)',
              ],
              borderWidth: 0
          }]
        },
        options: options,
  });

  var CChart2 = new Chart(Cctx2, {
      type: 'doughnut',
      data: {
          labels: ['무감정'],
          datasets: [{
              data: [data_C[1], 100-data_C[1]],
              backgroundColor: [
                  'rgba(255, 193, 7, 0.8)',
                  'rgba(255, 193, 7, 0.1)',
              ],
              borderWidth: 0
          }]
      },
      options: options,
  });

  var CChart3 = new Chart(Cctx3, {
      type: 'doughnut',
      data: {
          labels: ['슬픔'],
          datasets: [{
              data: [data_C[2], 100-data_C[2]],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(54, 162, 235, 0.1)',
              ],
              borderWidth: 0
          }]
      },
      options: options,
  });

  var CChart4 = new Chart(Cctx4, {
      type: 'doughnut',
      data: {
          labels: ['기쁨'],
          datasets: [{
              data: [data_C[3], 100-data_C[3]],
              backgroundColor: [
                  'rgba(40, 167, 69, 0.8)',
                  'rgba(40, 167, 69, 0.1)',
              ],
              borderWidth: 0
          }]
      },
      options: options,
  });

  var Ccharts = [{
                current: CChart
              , text: data_C[0]+'%'
              }, {
                current: CChart2
              , text: data_C[1]+'%'
              }, {
                current: CChart3
              , text: data_C[2]+'%'
              }, {
                current: CChart4
              , text: data_C[3]+'%'
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
}// 참여자 D의 4가지 감정
var Dctx = document.getElementById("화남D");
if (Dctx) {
  var Dctx2 = document.getElementById("무감정D");
  var Dctx3 = document.getElementById("슬픔D");
  var Dctx4 = document.getElementById("기쁨D");
  var member4 = document.getElementById('member4').value;
  var data_D = member4.split(',');
  var DChart = new Chart(Dctx, {
      type: 'doughnut',
      data: {
          labels: ['화남'],
          datasets: [{
              data: [data_D[0], 100-data_D[0]],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.8)',
                  'rgba(255, 99, 132, 0.1)',
              ],
              borderWidth: 0
          }]
        },
        options: options,
  });

  var DChart2 = new Chart(Dctx2, {
      type: 'doughnut',
      data: {
          labels: ['무감정'],
          datasets: [{
              data: [data_D[1], 100-data_D[1]],
              backgroundColor: [
                  'rgba(255, 193, 7, 0.8)',
                  'rgba(255, 193, 7, 0.1)',
              ],
              borderWidth: 0
          }]
      },
      options: options,
  });

  var DChart3 = new Chart(Dctx3, {
      type: 'doughnut',
      data: {
          labels: ['슬픔'],
          datasets: [{
              data: [data_D[2], 100-data_D[2]],
              backgroundColor: [
                  'rgba(54, 162, 235, 0.8)',
                  'rgba(54, 162, 235, 0.1)',
              ],
              borderWidth: 0
          }]
      },
      options: options,
  });

  var DChart4 = new Chart(Dctx4, {
      type: 'doughnut',
      data: {
          labels: ['기쁨'],
          datasets: [{
              data: [data_D[3], 100-data_D[3]],
              backgroundColor: [
                  'rgba(40, 167, 69, 0.8)',
                  'rgba(40, 167, 69, 0.1)',
              ],
              borderWidth: 0
          }]
      },
      options: options,
  });

  var Dcharts = [{
                current: DChart
              , text: data_D[0]+'%'
              }, {
                current: DChart2
              , text: data_D[1]+'%'
              }, {
                current: DChart3
              , text: data_D[2]+'%'
              }, {
                current: DChart4
              , text: data_D[3]+'%'
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
}
