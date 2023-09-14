var cityInput=$("#city");
var searchList=$("#pastSearch");
var submitEl=$("#btn");
var cityForm=$('#info-form');

var today=dayjs();
$('#theDate').text(today.format('(MM/D/YYYY)'));
//event to add city search to log of past searches//
submitEl.on("click",function(event)
{ event.preventDefault();

    var City=cityInput.val().trim();
    if (City === "") {
        return; 
      }
    var searches=getHistory();
    if (searches.length >= 10) {
        searches.pop();
      }

searches.unshift(City);
    saveHistory(searches)
   searchHistory(); 
cityInput.val("");
fetchWeather(City);
    
});

//function to display cities searched in the past//
function searchHistory() {
   
    searchList.empty();

    var searches = getHistory();
    for (var i = 0; i < searches.length; i++) {
      var search = searches[i];

      var li = $("<li>").text(search);
      li.attr("data-index", i);
      searchList.append(li);
    }
  }

 
  function getHistory() {
    var searches = localStorage.getItem("searches");
    if (searches) {
      searches = JSON.parse(searches);
    } else {
      searches = [];
    }
    return searches;
  }
  
  // Saves array of past searches to local storage
  function saveHistory(searches) {
    localStorage.setItem("searches", JSON.stringify(searches));
  }

  searchHistory();

  //Api code here
  function fetchWeather(cityName) {
    var apiKey = "747e07490e1714a9a86962e40ddbb776";
    var todayWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`; 
    var futureUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
  
    fetch(todayWeatherUrl)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Weather could not be fetched");
        }
        return response.json();
      })
      .then(function (data) {
        $("#results h2").text(data.name + " " + today.format("(MM/D/YYYY)"));
        $("#Temp").text("Temperature: " + data.main.temp + "°F"); // Display temperature in Fahrenheit
        $("#Wind").text("Wind: " + data.wind.speed + " m/s");
        $("#Humidity").text("Humidity: " + data.main.humidity + "%");
      })
      .catch(function (error) {
        console.error("Fetch error:", error);
      });

    fetch(futureUrl)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Forecast could not be fetched");
        }
        return response.json();
      })
      .then(function (data) {
        for (var i = 0; i < 5; i++) {
            var forecast = data.list[i]
    
            var date = dayjs.unix(forecast.dt).format("MM/DD/YYYY");
            var temperature = forecast.main.temp + "°F"; 
            var wind = forecast.wind.speed + " m/s";
            var humidity = forecast.main.humidity + "%";
    
            $(".dayBox h3")[i].textContent = date;
            $(".dayBox p.temp")[i].textContent = "Temp: " + temperature;
            $(".dayBox p.wind")[i].textContent = "Wind: " + wind;
            $(".dayBox p.humidity")[i].textContent = "Humidity: " + humidity;
        }
      })
      .catch(function (error) {
        console.error("Fetch error:", error);
      });
  }
  