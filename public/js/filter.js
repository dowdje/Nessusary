function filter() {
    // Declare variables

    var input = document.getElementById("filter"),
        filter = input.value.toUpperCase(),
        table = document.getElementById("table-body"),
        tr = table.getElementsByTagName("tr"),
        i, hostname, host, port, username;

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        hostname = (tr[i].getElementsByTagName("td")[0].innerHTML.toUpperCase().indexOf(filter) > -1);
        host = (tr[i].getElementsByTagName("td")[1].innerHTML.toUpperCase().indexOf(filter) > -1);
        port = (tr[i].getElementsByTagName("td")[2].innerHTML.toUpperCase().indexOf(filter) > -1);
        username = (tr[i].getElementsByTagName("td")[3].innerHTML.toUpperCase().indexOf(filter) > -1)
        if (tr[i]) {
            if (hostname || host || port || username) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}