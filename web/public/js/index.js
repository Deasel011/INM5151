function send_code_barre(codebarre) {
    var userid = 0;
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    $.ajax({
        type: "POST",
        url: proxy + "http://inf5151-refrigerateur.appspot.com/ajout/" + userid + "/" + codebarre
    }).done(function (data) {
        var listeBody = '';
        $.each(data, function (i, item) {
            console.log(item.success);
        });
    });
}

function parseForCodeBarres(){
    code_list = document.querySelectorAll("#result_strip > .thumbnails > li > .thumbnail > .caption > .code");
    code_list.forEach(function(elem){
        send_code_barre(elem.innerText)
    })
}

var code_barre = document.getElementsByClassName('code-barre')[0];
code_barre.addEventListener('click',function () {
swal({
  title: 'Numeriser un Code Barre',
  html: `
    <div id="result_strip">
        <ul class="thumbnails"></ul>
    </div>
    <div id="interactive" class="viewport"></div>
</section>
            `,
  type: 'info',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Envoyer'
}).then(function (result) {
  if (result.value) {
      parseForCodeBarres();
    swal(
      "C'est parti!",
      "Les modifications devraient apparaitre dans l'inventaire *si applicable.",
      'success'
    )
  }
  Quagga.stop();
});

    initCodeBarreCapture();


});


var facture = document.getElementsByClassName('facture')[0];

facture.addEventListener('click',function(){
    swal({
        title: '<i>Facture</i>',
        type: 'info',
        html:
'<div class="camera">'+
'<video id="video">Video stream not available.</video>'+
'<button id="startbutton">Take photo</button>'+
'</div>'+
'<canvas id="canvas">'+
'</canvas>',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
            '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down',
    });

    setTimeout(initCapture(),500);

});