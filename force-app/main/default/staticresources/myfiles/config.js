window.CoreControls.forceBackendType('ems');
window.CoreControls.setPDFWorkerPath('/resource')
window.CoreControls.setOfficeWorkerPath('/resource/office')
window.CoreControls.setPDFResourcePath('/resource/resource')
window.CoreControls.setPDFAsmPath('/resource/asm')


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