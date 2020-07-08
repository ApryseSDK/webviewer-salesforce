var resourceURL = '/webviewer-salesforce/'
window.CoreControls.forceBackendType('ems');

var urlSearch = new URLSearchParams(location.hash)
var custom = JSON.parse(urlSearch.get('custom'));
resourceURL = resourceURL + custom.namespacePrefix;

// office workers
window.CoreControls.setOfficeWorkerPath(resourceURL + 'office')
window.CoreControls.setOfficeAsmPath(resourceURL + 'office_asm');
window.CoreControls.setOfficeResourcePath(resourceURL + 'office_resource');

// pdf workers
window.CoreControls.setPDFResourcePath(resourceURL + 'resource')
if (custom.fullAPI) {
  window.CoreControls.setPDFWorkerPath(resourceURL+ 'pdf_full')
  window.CoreControls.setPDFAsmPath(resourceURL +'asm_full');
} else {
  window.CoreControls.setPDFWorkerPath(resourceURL+ 'pdf_lean')
  window.CoreControls.setPDFAsmPath(resourceURL +'asm_lean');
}

// external 3rd party libraries
window.CoreControls.setExternalPath(resourceURL + 'external')
window.CoreControls.setCustomFontURL('https://pdftron.s3.amazonaws.com/custom/ID-zJWLuhTffd3c/vlocity/webfontsv20/');




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