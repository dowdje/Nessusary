

function renderHostObjects(hosts){

  var $row;

  hosts.configurations.forEach((host, idx)=>{
    var $table = $('#table-body');
    $row = $('<tr/>', {class: 'row', id: 'row' + (idx + 1)}).prependTo($table)

    for(var key in host){
          $row.append($('<td/>',
            {class: key, text: host[key] }))
    }   
  });
  $row.css('color', 'black')
  $row.css('font-weight', 'bold')
  $row.css('font-size', '17px')
  // $("#table").trigger("update");
};


function getData(e) {

  if(!e){ var e = window.event};
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

  $('#search-form form').each(function(){
    this.reset();
  });

}