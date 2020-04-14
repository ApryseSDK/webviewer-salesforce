$(document).on('viewerLoaded', () => {
  custom = JSON.parse(window.ControlUtils.getCustomData());
  console.log(custom.licenseKey); // outputs 10
  window.sampleL = custom.licenseKey;


  window.CoreControls.forceBackendType('ems');
  // PDF workers
  window.CoreControls.setPDFWorkerPath('/resource');
  window.CoreControls.setPDFResourcePath('/resource/resource');
  window.CoreControls.setPDFAsmPath('/resource/asm');
  // Office workers
  window.CoreControls.setOfficeWorkerPath('/resource/office')
  window.CoreControls.setOfficeAsmPath('/resource/officeAsm');
  window.CoreControls.setOfficeResourcePath('/resource/officeResource');
  window.CoreControls.setCustomFontURL('https://pdftron.s3.amazonaws.com/custom/ID-zJWLuhTffd3c/vlocity/webfontsv20/');
});




// setInterval(() => {
//   console.log(`%c Post message back to parent `, 'background: green; color: white;');
//   parent.postMessage({type: 'MESSAGE_FOR_LWC_COMPONENT', payload: 'foo bar'}, '*')
// },3000)

// window.sampleL = 'Vlocity, Inc.(vlocity.com):OEM:See Agreement::B+:AMS(20200702):F2A5048D0447860A3360B13AC982737860614F8B5C706A158D1CE4C2C7BD3E960AAA31F5C7'

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  if (event.isTrusted && typeof event.data === 'object') {
    switch (event.data.type) {
      case 'OPEN_DOCUMENT':
        event.target.readerControl.loadDocument(event.data.file,
          {
            officeOptions: {
              disableBrowserFontSubstitution: true
            }
          }
        )
        break;
      default:
        break;
    }
  }
}
