// function loadTileSet(callback) {
//     // ...
//
//     imgTileSet.onload = function () {
//         // instead of return, do this
//         callback(arrTiles);
//     };
// }
//
// loadTileSet(function (arrNew) {
//     // now you can use arrNew
// });
//

function getData(callback) {

  var data = $.getJSON("https://marketdata.websol.barchart.com/getHistory.json?apikey=894fd77b8ce91b70a2a5b31367fc02e8&symbol=AAPL&type=minutes&startDate=20180101&endDate=20180301&maxRecords=20&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true&exchange=NYSE%2CAMEX%2CNASDAQ&backAdjust=false&daysToExpiration=1&contractRoll=expiration")
    .done(function(data){
    var x = data.results[0].close;
    var y = data.results[0].volume;
    var name = data.results[0].symbol;

    var arr = [];
    for(var i=0;i<data.results.length;i++){
      arr.push(data.results[i].close);
    }
    document.getElementById("name").innerHTML += name;
    document.getElementById("score").innerHTML += x;
    document.getElementById("vol").innerHTML += y;
    console.log(arr + " results");
    callback(arr);
  })
  .fail(function(){
    console.log("PROBLEM!");
  })
};

getData(function(data) {
  console.log(data);



new Chart(document.getElementById("bar-chart"), {
  type: 'line',
  data: {
    labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    datasets: [{
        data: [data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9]],
        label: "Closing",
        borderColor: "#3e95cd",
        fill: false
      },
      // {
      //   data: [282,350,411,502,635,809,947,1402,3700,5267],
      //   label: "Asia",
      //   borderColor: "#8e5ea2",
      //   fill: false
      // },
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Closing Prices Over Time'
    }
  }
});

});
