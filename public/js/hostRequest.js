
function renderHostObjects(hosts){
  hosts.forEach((host, idx)=>{
    var $table = $('#table-body');
    var $row = $('<tr/>', {class: 'row'}).appendTo($table)
      for(var key in host){
          $row.append($('<td/>',
            {class: key, text: host[key] }))
          }
    // zebraStripe($row)
    $("#table").trigger("update");
  });
};


function getData() {
  event.preventDefault();

  var paramObj = {'host': 2}

  $('#search-form form input').each(function(){
    if(this.value !== "" && this.name !== 'submit'){
      paramObj[this.name] = this.value
    }
  });

  params = $.param(paramObj)

  var xhttp = new XMLHttpRequest();
  var targetUrl = "https://nessus.herokuapp.com/download/request?"+ params;
  
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById('table-body').innerHTML = "";
      
    document.getElementById("table").append("");
      const hosts = JSON.parse(this.responseText);
      renderHostObjects(hosts)
    }else if (this.status){
      document.getElementById("table-body").innerHTML = "Oops!";
    }else{
      document.getElementById("table-body").innerHTML = "Loading... ";
    }
  };
  
  xhttp.open("GET", targetUrl, true);
  xhttp.send();

}


$(document).ready(function() 
    { 
        $("#table").tablesorter({
          sortList: [[1,1]],
          widgets:['zebra','resize'],    
          widgetOptions : {
            zebra : [ "normal-row", "alt-row" ]
            }
        }); 
    } 
); 