var cityInput=$("#city");
var searchList=$("#pastSearch");
var submitEl=$("#btn");
var cityForm=$('#info-form');

var today=dayjs();
$('#theDate').text(today.format('(MM/D/YYYY)'));
//event to add city search to log of past searches//
submitEl.addEventListener("click",function(event)
{ event.preventDefault();

    var pastCity=cityInput.value.trim();
    var searches=getHistory();
    searches.push(pastCity)
    saveHistory(searches)
   searchHistory(); 
cityInput.val('');
    
});

//function to display cities searched in the past//
function searchHistory() {
   
    searchList.empty();

    var searches=getHistory();
    for (var i = 0;i += 1;) {
      var search = searches[i];
  
      var li = $('<li>').text(search);
      li.setAttribute("data-index", i);
      searchList.append(li);
    }
  }

  function getHistory() {
    var searches = localStorage.getItem('searches');
    if (searches) {
      searches = JSON.parse(searches);
    }
    return searches;
  }
  
  // Saves array of past searches to local storage
  function saveHistory(searches) {
    localStorage.setItem('searches', JSON.stringify(searches));
  }

  searchHistory();