$(document).ready(function () {


  var userid = 0;
  var proxy = 'https://cors-anywhere.herokuapp.com/';
  $.ajax({
    type: "GET",
    url: proxy + "http://inf5151-refrigerateur.appspot.com/inventaire/" + userid
  }).done(function (data) {
    var listeBody = '';
    $.each(data, function (i, item) {
      listeBody += '<li class="list-group-item">';
      listeBody += '<img src="images/produits/' + item.nom.replace(/ |'/gi, "_").toLowerCase() + '.png" alt="" height="42" width="42">';
      listeBody += '<b> ' + item.nom + '</b><span class="badge">' + item.quantite + '</span></li>';
    });
    $("#listeProduits").html(listeBody);
  });


});