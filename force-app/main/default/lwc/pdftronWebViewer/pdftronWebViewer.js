import { LightningElement, track, wire } from 'lwc';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CurrentPageReference } from 'lightning/navigation';
import { loadScript } from 'lightning/platformResourceLoader';
import libUrl from '@salesforce/resourceUrl/lib';
import myfilesUrl from '@salesforce/resourceUrl/myfiles';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

export default class PdftronWebViewer extends LightningElement {
  fullAPI = true;
  @wire(CurrentPageReference) pageRef;

  connectedCallback() {
      registerListener('fileSelected', this.handleFileSelected, this);
  }

  disconnectedCallback() {
      unregisterAllListeners(this);
  }

  handleFileSelected(file) {
    this.iframeWindow.postMessage({type: 'OPEN_DOCUMENT', file: file}, '*')
  }

  divHeight = 600;
  uiInitialized = false;
  renderedCallback() {
    if (this.uiInitialized) {
        return;
    }
    this.uiInitialized = true;

    Promise.all([
        loadScript(this, libUrl + '/webviewer.min.js')
    ])
    .then(() => {
       this.initUI();
    })
    .catch(console.error);
  }
  initUI() {
    const myObj = {
      libUrl: libUrl,
      fullAPI: this.fullAPI,
      namespacePrefix: '',
    };

    const url = myfilesUrl + '/webviewer-demo-annotated.pdf';
    // var url = myfilesUrl + '/webviewer-demo-annotated.xod';
    // var url = myfilesUrl + '/word.docx';

    const viewerElement = this.template.querySelector('div')
    const viewer = new WebViewer.Iframe({
      path: libUrl, // path to the PDFTron 'lib' folder on your server
      custom: JSON.stringify(myObj),
      backendType: 'ems',
      config: myfilesUrl + '/config_apex.js',
      fullAPI: this.fullAPI,
      enableFilePicker: this.enableFilePicker,
      enableRedaction: this.enableRedaction,
      enableMeasurement: this.enableMeasurement,
      enableOptimizedWorkers: true,
      // l: 'YOUR_LICENSE_KEY_HERE',
    }, viewerElement);

    viewerElement.addEventListener('ready', () => {
      this.iframeWindow = viewerElement.querySelector('iframe').contentWindow
    })

  }
}
