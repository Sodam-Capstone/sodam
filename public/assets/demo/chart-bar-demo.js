// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var colors = [ '#59898d','#d1dbe5','#688ab0','#1d3659','#dc3545','#6c757d'];

// 참여자 이름
var people = new Array();
people[0] = document.getElementById("memberdata1").value;
people[1] = document.getElementById("memberdata2").value;
people[2] = document.getElementById("memberdata3").value;
people[3] = document.getElementById("memberdata4").value;
// 전체 참여자 회의 점수
var data_total = new Array();
data_total[0] = document.getElementById("timedata1").value;
data_total[1] = document.getElementById("timedata2").value;
data_total[2] = document.getElementById("timedata3").value;
data_total[3] = document.getElementById("timedata4").value;

var avg = 0;
var max = 0;
var i = 0;
while(people[i]!=''&& people[i]!=undefined) {
  avg+=data_total[i]*1.0;
  if(max < data_total[i])
    max = data_total[i]*1.0;
  i+=1;
}
avg = ((avg / i)*1.0).toFixed(1);

// for(var i=0;temp[i]!=undefined;i++) {
//   people[i] = temp[i];
// }

var BarOptions = {
  scales: {
    xAxes: [{
      time: {
        unit: 'month'
      },
      gridLines: {
        gridLines: {
          offsetGridLines: true
         }
        //display: false
      },
      ticks: {
        maxTicksLimit: 6
      }
    }],
    yAxes: [{
      ticks: {
        min: 0,
        max: max,
        maxTicksLimit: 50
      },
      gridLines: {
        display: true
      }
    }],
  },
  legend: {
    display: false
  }
};


var chBarData = {
  labels: people.slice(0,i),
  datasets: [{
    //label: "Revenue",
    backgroundColor: "rgb(61,89,127)",
    borderColor: "rgba(2,117,216,1)",
    data: data_total.slice(0,i),

    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
  }]
};


// total Bar 1
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: chBarData,
  options: BarOptions
});


// 참여자 A
var chBarData1 = {
  labels: [people[0], '평균'],
  datasets: [{
    //label: "Revenue",
    backgroundColor: colors.slice(0,2),
    borderColor: colors.slice(0,2),
    data: [data_total[0],avg],

    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
  }]
};

var ctx1 = document.getElementById("myBarChart1");
var myLineChart = new Chart(ctx1, {
  type: 'bar',
  data: chBarData1,
  options: BarOptions
});


// 참여자 B
var chBarData2 = {
  labels: [people[1], '평균'],
  datasets: [{
    //label: "Revenue",
    backgroundColor: colors.slice(0,2),
    borderColor: colors.slice(0,2),
    data: [data_total[1], avg],

    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
  }]
};

var ctx2 = document.getElementById("myBarChart2");
var myLineChart = new Chart(ctx2, {
  type: 'bar',
  data: chBarData2,
  options: BarOptions
});


// 참여자 C
var chBarData3 = {
  labels: [people[2], '평균'],
  datasets: [{
    //label: "Revenue",
    backgroundColor: colors.slice(0,2),
    borderColor: colors.slice(0,2),
    data: [data_total[2], avg],

    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
  }]
};

var ctx3 = document.getElementById("myBarChart3");
var myLineChart = new Chart(ctx3, {
  type: 'bar',
  data: chBarData3,
  options: BarOptions
});

// 참여자 D
var chBarData4 = {
  labels: [people[3], '평균'],
  datasets: [{
    //label: "Revenue",
    backgroundColor: colors.slice(0,2),
    borderColor: colors.slice(0,2),
    data: [data_total[3], avg],

    barPercentage: 0.5,
    barThickness: 6,
    maxBarThickness: 8,
    minBarLength: 2,
  }]
};

var ctx4 = document.getElementById("myBarChart4");
var myLineChart = new Chart(ctx4, {
  type: 'bar',
  data: chBarData4,
  options: BarOptions
});
