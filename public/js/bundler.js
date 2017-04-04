var tablesort = require('tablesort');
var localforage = require('localforage');

function renderHostObjects(hosts){
  var $row;

  hosts.configurations.forEach((host, idx)=>{

    var $table = $('#table-body');

    $row = $('<tr/>', {class: 'row', id: 'row' + (idx + 1)})

    $table.prepend($row)
      for(var key in host){
          $row.append($('<td/>',
            {class: key, text: host[key] }))
      }

    $row.click(function() {
      $(this).parent().children().removeClass("selected");
      $(this).addClass("selected");
    });  
  });

  $row.css('color', 'black');
  $row.css('font-weight', 'bold');
  $row.css('font-size', '17px');

  tablesort(document.getElementById('table'));


  // $("#table").trigger("update");
};


function getData(e) {
  e.preventDefault();

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
      $('#table-body').empty();
      $("#table").append("");
      const hosts = JSON.parse(this.responseText);
      renderHostObjects(hosts)
    }else if (this.status){
      $("#table-body").innerHTML = "Oops!";
    }else{
      $("#table-body").innerHTML = "Loading... ";
    }
  };
  
  xhttp.open("GET", targetUrl, true);
  xhttp.send();

  $('#search-form form').each(function(){
    this.reset();
  });

}

function storeResponse(obj){
  localStorage.setItem('configurations', JSON.stringify(obj.configurations))
}


$(document).ready(function(){

  $('#search-form').submit(function(event){
    getData(event);
  });

  var paramObj = {'host': 2}

  params = $.param(paramObj)

  var xhttp = new XMLHttpRequest();
  var targetUrl = "https://nessus.herokuapp.com/download/request?"+ params;
  
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      $('#table-body').innerHTML = "";
      $("#table").append("");
      const hosts = JSON.parse(this.responseText);
      renderHostObjects(hosts);
      tablesort(document.getElementById('table'));
    }else if (this.status){
      $("#table-body").innerHTML = "Oops!";
    }else{
      $("#table-body").innerHTML = "Loading... ";
    }
  };
  
  xhttp.open("GET", targetUrl, true);
  xhttp.send();
});