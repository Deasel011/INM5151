$(document).ready(function () {
  var userid = 0;
    $.ajax({
        type: 'GET',
        url: "http://inf5151-refrigerateur.appspot.com/inventaire/" + userid,
        dataType: "json",
        success: function (data) {
          var listeBody = '';
          $.each(data, function (i, item) {            
            listeBody += '<li class="list-group-item">';
            listeBody += '<img src="images/produits/'+ item.nom.replace(/ |'/gi, "_") +'.png" alt="" height="42" width="42">';
            listeBody += '<b> '+ item.nom +'</b><span class="badge">'+ item.poids +'</span></li>';
          });
          $("#listeProduits").html(listeBody);
              
        },
        error: function (err) {
          alert('Erreur : ' + err.status);
        },
        failer: function () {
          alert('La demande de ressource a échoué !');
        }
      });

      
});