const resourceURL = '/resource/'
window.CoreControls.forceBackendType('ems');

const urlSearch = new URLSearchParams(location.hash)
const custom = JSON.parse(urlSearch.get('custom'));
resourceURL = resourceURL + custom.namespacePrefix;

/**
 * The following `window.CoreControls.set*` functions point WebViewer to the
 * optimized source code specific for the Salesforce platform, to ensure the
 * uploaded files stay under the 5mb limit
 */
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

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  /**
   * @note If you are using WebViewer version <= 7.x, please uncomment the line
   * below
   */
  // const instance = readerControl;
  if (event.isTrusted && typeof event.data === 'object') {
    switch (event.data.type) {
      case 'OPEN_DOCUMENT':
        instance.loadDocument(event.data.file)
        break;
      case 'OPEN_DOCUMENT_BLOB':
        const { blob, extension, filename, documentId } = event.data.payload;
        instance.loadDocument(blob, { extension, filename, documentId })
        break;
      case 'CLOSE_DOCUMENT':
        instance.closeDocument()
        break;
      default:
        break;
    }
  }
}
