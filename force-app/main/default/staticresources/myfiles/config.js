let resourceURL = '/resource/'
/**
 * @note If you are using WebViewer <= 7.x, please uncomment the line below, and
 * comment out the line below that
 */
// const Core = window.CoreControls; // WebViewer <= 7.x
const Core = window.Core; // WebViewer >= 8.x
Core.forceBackendType('ems');

const urlSearch = new URLSearchParams(location.hash)
const custom = JSON.parse(urlSearch.get('custom'));
resourceURL = resourceURL + custom.namespacePrefix;

/**
 * The following `Core.set*` functions point WebViewer to the
 * optimized source code specific for the Salesforce platform, to ensure the
 * uploaded files stay under the 5mb limit
 */
// office workers
Core.setOfficeWorkerPath(resourceURL + 'office')
Core.setOfficeAsmPath(resourceURL + 'office_asm');
Core.setOfficeResourcePath(resourceURL + 'office_resource');

// pdf workers
Core.setPDFResourcePath(resourceURL + 'resource')
if (custom.fullAPI) {
  Core.setPDFWorkerPath(resourceURL+ 'pdf_full')
  Core.setPDFAsmPath(resourceURL +'asm_full');
} else {
  Core.setPDFWorkerPath(resourceURL+ 'pdf_lean')
  Core.setPDFAsmPath(resourceURL +'asm_lean');
}

// external 3rd party libraries
Core.setExternalPath(resourceURL + 'external')

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
        instance.loadDocument(event.data.file, {
          officeOptions: {
            disableBrowserFontSubstitution: true,
          }
        })
        break;
      case 'OPEN_DOCUMENT_BLOB':
        const { blob, extension, filename, documentId } = event.data.payload;
        instance.loadDocument(blob, { extension, filename, documentId,
          officeOptions: {
            disableBrowserFontSubstitution: true,
          }
        })
        break;
      case 'CLOSE_DOCUMENT':
        instance.closeDocument()
        break;
      default:
        break;
    }
  }
}