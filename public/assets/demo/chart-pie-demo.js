// Set new default font family and font color to mimic Bootstrap's default styling
 Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
 Chart.defaults.global.defaultFontColor = '#292b2c';


//pie chart 색상, 임의 지정
//var colors = [ '#0092B9','#beefd2','#ffddfb','#cdecff','#dc3545','#6c757d'];
//var colors = [ '#BC3603','#F2B705','#86AD00','#0092B9'];
//var colors = ['rgba(255, 99, 132, 0.8)','rgba(255, 193, 7, 0.8)','rgba(54, 162, 235, 0.8)','rgba(40, 167, 69, 0.8)'];
var colors = ['#dc3545', '#ffc107','#007bff', '#28a745']




// 개인 데이터 (화남,무감정,슬픔,기쁨)
//
var pie_labels =['화남','무감정','슬픔','기쁨'];

// pie chart 보이는 옵션
var donutOptions = {
      title:{
        display:true,
        //text:'4가지 감정 분석 비율',
        fontFamily:'Helvetica Neue',
        fontSize: 15,
        padding: 5
      },
      responsive: true,
      position: 'relative',
      cutoutPercentage: 0, //도넛두께 : 값이 클수록 얇아짐
      layout:{
              padding:{
                    left: 0,
                    right: 100,
                    top: 0,
                    bottom: 10
              } // 도넛 위치 지정
      },
      legend: {
              position:'right',
              margin:{
                right: 70,
                top : 10000
              },
              labels: {
                pointStyle:'circle',
                usePointStyle:true
                }
      },
      pieceLabel: {
        mode:"label",
        precision:0,
        fontSize: 10,
        fontStyle: 'bold'
      },
};

var chDonut1 = document.getElementById("myPieChart1");
var chDonut2 = document.getElementById("myPieChart2");
var chDonut3 = document.getElementById("myPieChart3");
var chDonut4 = document.getElementById("myPieChart4");
////piechart 그리기

if (chDonut1) {
  var member1 = document.getElementById('member1').value;
  var emotion1 = member1.split(',');
//  alert(emotion1[0]);

  // donut 1  , 참여자 1
  var chDonutData1 = {
    labels: pie_labels.slice(0,4),
    datasets: [ {
      backgroundColor: colors.slice(0,4),
      borderColor: colors.slice(0,4),
      borderAlign : 'inner',
      borderWidth: 2,
      data: emotion1.slice(0,4)
    }]
  };
  new Chart(chDonut1, {
    type: 'doughnut',
    data: chDonutData1,
    options: donutOptions});
}

// donut 2 , 참여자 2
if (chDonut2) {
  var member2 = document.getElementById('member2').value;
  var emotion2 = member2.split(',');

  var chDonutData2 = {
    labels: pie_labels.slice(0,4),
    datasets: [ {
      backgroundColor: colors.slice(0,4),
      borderColor: colors.slice(0,4),
      borderAlign : 'inner',
      borderWidth: 2,
      data: emotion2.slice(0,4)
    }]
  };
  new Chart(chDonut2, {
    type: 'doughnut',
    data: chDonutData2,
    options: donutOptions});
}



// donut 3 , 참여자 3
if (chDonut3) {
  var member3 = document.getElementById('member3').value;
  var emotion3 = member3.split(',');

  var chDonutData3 = {
    labels: pie_labels.slice(0,4),
    datasets: [ {
      backgroundColor: colors.slice(0,4),
      borderColor: colors.slice(0,4),
      borderAlign : 'inner',
      borderWidth: 2,
      data: emotion3.slice(0,4)
    }]
  };
  new Chart(chDonut3, {
    type: 'doughnut',
    data: chDonutData3,
    options: donutOptions});
}

// donut 4 , 참여자 4
if (chDonut4) {
  var member4 = document.getElementById('member4').value;
  var emotion1 = member1.split(',');

  var chDonutData4 = {
    labels: pie_labels.slice(0,4),
    datasets: [ {
      backgroundColor: colors.slice(0,4),
      borderColor: colors.slice(0,4),
      borderAlign : 'inner',
      borderWidth: 2,
      data: emotion4.slice(0,4)
    }]
  };
  new Chart(chDonut4, {
    type: 'doughnut',
    data: chDonutData4,
    options: donutOptions});
}
