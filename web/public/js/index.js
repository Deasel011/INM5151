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
  confirmButtonText: 'Retour'
}).then(function (result) {
  if (result.value) {
    swal(
      'Lets',
      'Go!!!',
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

function sendCodeBarre(codebarre) {
    var userid = 0;
    $.ajax({
		type : 'POST',
		url : "http://inf5151-refrigerateur.appspot.com/ajout/"+ userid +"/"+ codebarre,
		contentType : "application/json; charset=utf-8",
		dataType : 'json',
		data : body,
		cache: false,
		processData : false,
		success : function() {
			
		},
		error : function() {
			
		}
	});
}
