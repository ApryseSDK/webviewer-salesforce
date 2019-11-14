window.CoreControls.forceBackendType('ems');
// PDF workers
window.CoreControls.setPDFWorkerPath('/resource');
window.CoreControls.setPDFResourcePath('/resource/resource');
window.CoreControls.setPDFAsmPath('/resource/asm');
// Office workers
window.CoreControls.setOfficeWorkerPath('/resource/office')
window.CoreControls.setOfficeAsmPath('/resource/officeAsm');
window.CoreControls.setOfficeResourcePath('/resource/officeResource');


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
