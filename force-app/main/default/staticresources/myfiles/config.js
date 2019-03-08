window.CoreControls.forceBackendType('ems');
window.CoreControls.setPDFWorkerPath('/resource')
window.CoreControls.setOfficeWorkerPath('/resource/office')
window.CoreControls.setPDFResourcePath('/resource/resource')
window.CoreControls.setPDFAsmPath('/resource/asm')

// $(document).on('viewerLoaded', function() {
//   custom = JSON.parse(window.ControlUtils.getCustomData());
//   console.log(custom.startPage); // outputs 10
// });

window.sampleL = 'YOUR_LICENSE_KEY_HERE'; // enter your key here so that the samples will run

if (!window.sampleL) {
  window.sampleL = localStorage.getItem('wv-sample-license-key') || window.location.search.slice(5);
  if (!window.sampleL) {
    window.sampleL = window.prompt('No license key is specified.\nPlease enter your key here or add it to license-key.js inside the samples folder.', '');
    if (window.sampleL) {
      localStorage.setItem('wv-sample-license-key', window.sampleL);
    }
  }
}


window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  if (event.isTrusted && typeof event.data === 'object') {
    switch (event.data.type) {
      case 'OPEN_DOCUMENT':
        event.target.readerControl.loadDocument(event.data.file)
        break;
      default:
        break;
    }
  }
}