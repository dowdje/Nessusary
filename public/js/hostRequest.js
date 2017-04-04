function getHosts(e) {
  var params, paramObj, xhttp, targetUrl;

  if(!e){ var e = window.event};
  e.preventDefault();

  var paramObj = {'host': 2}

  $('#search-form form input').each(function(){
    if(this.value !== "" && this.name !== 'submit'){
      paramObj[this.name] = this.value
    }
  });

  //Add host request to a submit event on the search form
  $('#search-form').submit(function(event){
    getData(event);
  });

  //assign query params string
  params = $.param(paramObj)

  // assign request variables
  xhttp = new XMLHttpRequest();
  targetUrl = "https://nessus.herokuapp.com/download/request?"+ params;
  
  xhttp.onreadystatechange = function() {

    //Check request state
    if (this.readyState == 4 && this.status == 200) {
      var hosts;

      $('#table-body').innerHTML = "";
      $("#table").append("");

      hosts = JSON.parse(this.responseText);
      renderHostObjects(hosts);

      tablesort(document.getElementById('table'));

    }else if (this.status){

      $("#table-body").innerHTML = "Oops!";

    }else{

      $("#table-body").innerHTML = "Loading... ";
      
    }
  };

  // send xhttp request
  xhttp.open("GET", targetUrl, true);
  xhttp.send();

}

function renderHostObjects(hosts){

  var $row, $table;

  $table = $('#table-body');

  hosts.configurations.forEach((host, idx)=>{
    $row = $('<tr/>', {class: 'row', id: 'row' + (idx + 1)}).prependTo($table)

    for(var key in host){
          $row.append($('<td/>',
            {class: key, text: host[key] }))
    }   
  });
  $row.addClass('selected')
};


