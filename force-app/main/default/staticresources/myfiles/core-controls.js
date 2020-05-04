const getWindowHash = () => {
  const url = window.location.href;
  const i = url.indexOf('#');
  return (i >= 0 ? url.substring(i + 1) : '');
};

var params = getWindowHash(); // parse url parameters
var json = params.split('=')[1];

var clientSidePdfGenerationConfig = JSON.parse(decodeURI(json))

console.log(clientSidePdfGenerationConfig)

var script = document.createElement('script');
script.onload = function () {
  console.log(`%c onload `, 'background: red; color: white;');
  init();
};
script.src = clientSidePdfGenerationConfig['core_contorls'];

document.head.appendChild(script);




function init() {
  console.log(`%c initialize CoreControls `, 'background: red; color: white;');
    window.CoreControls.forceBackendType('ems');
    //window.CoreControls.setPDFWorkerPath(clientSidePdfGenerationConfig['cs_pdftron_full']);
    window.CoreControls.setPDFWorkerPath(clientSidePdfGenerationConfig['cs_pdftron_lean']);
    window.CoreControls.setOfficeWorkerPath(clientSidePdfGenerationConfig['cs_pdftron_office']);
    window.CoreControls.setPDFResourcePath(clientSidePdfGenerationConfig['cs_pdftron_resource']);
    window.CoreControls.setPDFAsmPath(clientSidePdfGenerationConfig['cs_pdftron_asm']);
    window.CoreControls.setExternalPath(clientSidePdfGenerationConfig['cs_pdftron_external']);

    //Set the path for Fonts
    // window.CoreControls.setCustomFontURL(clientSidePdfGenerationConfig['cs_vlocity_webfonts_main'] + '/');

    //Set the path for office workers
    window.CoreControls.setOfficeAsmPath(clientSidePdfGenerationConfig['cs_pdftron_officeasm']);
    window.CoreControls.setOfficeResourcePath(clientSidePdfGenerationConfig['cs_pdftron_officeresource']);
    window.CoreControls.disableEmbeddedJavaScript(true)

    console.log(CoreControls)
    console.log(PDFNet)
    PDFNet.initialize()


    setInterval(() => {
      console.log(`%c Post message back to parent `, 'background: green; color: white;');
      parent.postMessage({type: 'MESSAGE_FOR_LWC_COMPONENT', payload: 'foo bar'}, '*')
    }, 5000)


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
}