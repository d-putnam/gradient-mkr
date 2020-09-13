open();

$( "#code" ).click(function() {
    $ (".codebox" ).slideToggle("slow");
});

let btn = document.querySelector("#save");
let svg = document.querySelector('svg');
let canvas = document.querySelector("#canvas")
function triggerDownload (imgURI) {

let evt = new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true
});

let a = document.createElement('a');
a.setAttribute('download', 'myGradient.png');
a.setAttribute('href', imgURI);
a.setAttribute('target', '_blank');

a.dispatchEvent(evt);
}

btn.addEventListener('click', function () {
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let data = (new XMLSerializer()).serializeToString(svg);
let DOMURL = window.URL || window.webkitURL || window;

let img = new Image();
let svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
let url = DOMURL.createObjectURL(svgBlob);

img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url);

    let imgURI = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

    triggerDownload(imgURI);
};

img.src = url;
});