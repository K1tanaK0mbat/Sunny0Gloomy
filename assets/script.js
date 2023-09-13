var cityInput=$("#city");
var searchList=$("#pastSearch");
var sumbit=$("#btn");
var searches=[];
var cityForm=$('#info-form')
//event to add city search to log of past searches//
cityForm.on('submit',function()
{
    var pastCity=cityInput.value.trim();
    searches.push(pastCity)
    cityInput.val('');

    searchHistory();
})

//function to display cities searched in the past//
function searchHistory() {
   
    searchList.innerHTML = "";
  
    for (var i = 0; i < searches.length; i += 1) {
      var search = searches[i];
  
      var li = $('<li>').text(search);
      li.setAttribute("data-index", i);
      searchList.append(li);
    }
  }
  