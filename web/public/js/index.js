var codebarre = document.getElementsByClassName('code-barre')[0];

codebarre.addEventListener('click',function(){
    swal({
        title: '<i>Capture</i>',
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