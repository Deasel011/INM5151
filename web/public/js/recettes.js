$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: "/resources/getAll",
        dataType: "json",
        success: function (data) {
          var listeBody = '';
          $.each(data, function (i, item) {            
            listeBody += '<li id="'+ item.id +'" class="list-group-item">';
            listeBody += '<img src="'+ item.img +'" alt="Tomate" height="60" width="60">';
            listeBody += '<b> '+ item.nom +'</b></li>';
          });
          $("#listeRecettes").html(listeBody);
          $('ul.list-group li').click(function(e) 
          { 
           window.location.replace("/recette/"+ $(this).attr('id'));
          });
    
        },
        error: function (err) {
          alert('Erreur : ' + err.status);
        },
        failer: function () {
          alert('La demande de ressource a échoué !');
        }
      });

      
});