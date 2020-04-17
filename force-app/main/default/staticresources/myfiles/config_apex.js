var resourceURL = '/resource/'
window.CoreControls.forceBackendType('ems');

window.addEventListener('viewerLoaded', () => {
  custom = JSON.parse(readerControl.getCustomData());
  // console.log('viewerLoaded')
  // console.log(custom); // outputs 10
  const namespacePrefix = custom.namespacePrefix;
  resourceURL = resourceURL + namespacePrefix;
  // office workers
  window.CoreControls.setOfficeWorkerPath(resourceURL + 'office')
  window.CoreControls.setOfficeAsmPath(resourceURL + 'officeAsm');
  window.CoreControls.setOfficeResourcePath(resourceURL + 'officeResource');
  // pdf workers
  window.CoreControls.setPDFWorkerPath(resourceURL + 'lean')
  window.CoreControls.setPDFResourcePath(resourceURL + 'resource')
  window.CoreControls.setPDFAsmPath(resourceURL + 'asmLean')
  // external 3rd party libraries
  window.CoreControls.setExternalPath(resourceURL + 'external')

  if (custom.fullAPI) {
    window.CoreControls.setPDFWorkerPath(resourceURL + 'full')
    window.CoreControls.setPDFAsmPath(resourceURL + 'asmFull')
  }
});



window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  if (event.isTrusted && typeof event.data === 'object') {
    switch (event.data.type) {
      case 'OPEN_DOCUMENT':
        event.target.readerControl.loadDocument(event.data.file)
        break;
      case 'OPEN_DOCUMENT_BLOB':
        const { blob, extension, filename, documentId } = event.data.payload;
        event.target.readerControl.loadDocument(blob, { extension, filename, documentId })
        break;
      case 'CLOSE_DOCUMENT':
        event.target.readerControl.closeDocument()
        break;
      default:
        break;
    }
  }
}