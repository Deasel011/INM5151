var id = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);

$(document).ready(function () {  

    $.ajax({
        type: 'GET',
        url: "/recettes/" + id,
        dataType: "json",
        success: function (data) {
          var listeBody = '';
          $.each(data.ingredients, function (i, item) {            
            listeBody += '<li class="list-group-item">';
            listeBody += '<b> '+ item.nom +'</b><span class="badge">'+ item.qnt +'</span></li>';
          });
          $("#listeIngredients").html(listeBody);
          $('#preparation').html(data.preparation); 
          $('#titre').html(data.nom);             
        },
        error: function (err) {
          alert('Erreur : ' + err.status);
        },
        failer: function () {
          alert('La demande de ressource a échoué !');
        }
      });

      
});