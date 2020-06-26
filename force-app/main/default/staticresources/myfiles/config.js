var resourceURL = '/resource/'
window.CoreControls.forceBackendType('ems');

window.addEventListener('viewerLoaded', () => {
  custom = JSON.parse(readerControl.getCustomData());

  const namespacePrefix = custom.namespacePrefix;
  resourceURL = resourceURL + namespacePrefix;

  // office workers
  window.CoreControls.setOfficeWorkerPath(resourceURL + 'office')
  window.CoreControls.setOfficeAsmPath(resourceURL + 'office_asm');
  window.CoreControls.setOfficeResourcePath(resourceURL + 'office_resource');

  // pdf workers
  window.CoreControls.setPDFWorkerPath(resourceURL+ 'pdf_lean')
  window.CoreControls.setPDFResourcePath(resourceURL + 'resource')
  window.CoreControls.setPDFAsmPath(resourceURL +'asm_lean');

  // external 3rd party libraries
  window.CoreControls.setExternalPath(resourceURL + 'external')

  window.CoreControls.setCustomFontURL('https://pdftron.s3.amazonaws.com/custom/ID-zJWLuhTffd3c/vlocity/webfontsv20/');
});



window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  if (event.isTrusted && typeof event.data === 'object') {
    switch (event.data.type) {
      case 'OPEN_DOCUMENT':
        event.target.readerControl.loadDocument(event.data.file, {
          officeOptions: {
            disableBrowserFontSubstitution: true,
          }
        })
        break;
      case 'OPEN_DOCUMENT_BLOB':
        const { blob, extension, filename, documentId } = event.data.payload;
        event.target.readerControl.loadDocument(blob, { extension, filename, documentId,
          officeOptions: {
            disableBrowserFontSubstitution: true,
          }
        })
        break;
      case 'CLOSE_DOCUMENT':
        event.target.readerControl.closeDocument()
        break;
      default:
        break;
    }
  }
}