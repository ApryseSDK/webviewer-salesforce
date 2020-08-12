# How to Add a PDFTron WebViewer to Salesforce as a Lightning Web Component
This project contains the source code for this [blog post](https://www.pdftron.com/blog/webviewer/add-pdf-viewer-editor-to-salesforce-as-lwc/) or you can [watch a video](https://youtu.be/NdRg-RnlC5g) instead.

![WebViewer][webviewer]

The quickest way to getting started with WebViewer in Salesforce is to follow
the instructions below.

## Requirements

* [PDFTron WebViewer](https://www.pdftron.com/documentation/web/download) (Download `WebViewer.zip`)
* [Salesforce CLI](https://trailhead.salesforce.com/en/content/learn/modules/sfdx_app_dev/sfdx_app_dev_setup_dx#Tdxn4tBK-heading6)
* [Node and NPM](https://nodejs.org/en/)

## Installing WebViewer Sample App using Salesforce DX
1. Install Salesforce DX. Enable the Dev Hub in your org or sign up for a Dev Hub trial org and install the Salesforce DX CLI. Follow the instructions in the [Salesforce DX Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm?search_text=trial%20hub%20org) or in the [App Development with Salesforce DX](https://trailhead.salesforce.com/modules/sfdx_app_dev) Trailhead module. The steps include:
   * [Enable Dev Hub in you project](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_enable_devhub.htm)
   * [Install Salesforce CLI](https://trailhead.salesforce.com/en/content/learn/modules/sfdx_app_dev/sfdx_app_dev_setup_dx#Tdxn4tBK-heading6)
   * (Optional) [Install Salesforce Extensions for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode)

2. Clone the `webviewer-salesforce` from Github repo:
```
git clone git@github.com:PDFTron/webviewer-salesforce.git
cd webviewer-salesforce
```

3. Extract `WebViewer.zip`, `cd` to the directory the contents were extracted
into, and run the following optimization script:

```
$ npm run optimize

Optimize: Do you want us to backup your files before optimizing? [y/n]:  y

Optimize: Will you be using WebViewer Server? See
https://www.pdftron.com/documentation/web/guides/wv-server/ for more info.
[y/n]:  n

Optimize: Will you be converting all your documents to XOD? See
https://www.pdftron.com/documentation/web/guides/optimize-lib-folder for more
info. [y/n]:  n

Optimize: Do you need client side office support? [y/n]:  y

Optimize: Do you need the full PDF API? See
https://www.pdftron.com/documentation/web/guides/optimize-lib-folder for more
info (most users dont need this option). [y/n]:  n

Optimize: Do you need to deploy to Salesforce? See
https://www.pdftron.com/documentation/web/guides/optimize-lib-folder for more
info (most users dont need this option). [y/n]:  y
```

This optimization process produces zip files of size 5 MB or less, which enables
you to safely upload to the Salesforce platform.

Note that in certain circumstances, you may need the full PDF API. For more
details on when you may need to enable it, see:

https://www.pdftron.com/documentation/web/guides/full-api-overview/

4. Copy all the zip files from `webviewer-salesforce` folder, which were generated after running above npm optimization script, into `force-app/main/default/staticresources`.

![Zip files][zip_files]

Every `*.zip` file should have a corresponding `*.resource-meta.xml` file, where
the contents of each `.xml` file are the same.

5. If you have a paid license key, you can remove the watermark from rendered
documents by adding the key to the `PDFTron.WebViewer` constructor here
[`./force-app/main/default/lwc/webViewer/webViewer.js`](./force-app/main/default/lwc/webViewer/webViewer.js#L53).

6. If you haven’t already done so, authenticate with your hub org and provide it with an alias (**DevHub** in the command below):
```
sfdx force:auth:web:login --setdefaultdevhubusername --setalias DevHub
```

7. Enter your Dev Hub org credentials in the browser that opens. After you log in successfully, you can close the browser. Create a scratch org using the `config/project-scratch-def.json` file, set the **username** as your default, and assign it an alias.
```
sfdx force:org:create --setdefaultusername -f config/project-scratch-def.json --setalias my-scratch-org
```

8. Push the app to your scratch org:
```
sfdx force:source:push -f
```

9. Open the scratch org:
```
sfdx force:org:open
```

10. Click the app launcher icon ![App Launcher icon][app_launcher] to open the App Launcher, then click PDFTron.

![PDFTron app][pdftron_app]

![WebViewer][webviewer]

## Implementation Details for Developers

### Communicating with CoreControls from Lightning Web Component
On the Salesforce platform, Lightning Web Component have limits accessing to WebViewer’s `iframe` due to [LockerService](https://developer.salesforce.com/blogs/developer-relations/2017/02/lockerservice-lightning-container-third-party-libraries-lightning-components.html) requirements. Lightning Component can use limited communication mechanism between components using [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). You can find more information about LockerService [here](https://developer.salesforce.com/blogs/developer-relations/2017/02/lockerservice-lightning-container-third-party-libraries-lightning-components.html).

Here is implementation of the `postMessage` mechanism used in our sample github project and you can use this similar approach to communicate with the `iframe`’s `contentWindow`.

Inside `config.js` file, use following:
```js
window.addEventListener('message', receiveMessage, false);

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
```
and in the Lightning Web Component send messages with postMessage as following:

```js
import { LightningElement, track, wire } from 'lwc';
import myfilesUrl from '@salesforce/resourceUrl/myfiles';
import libUrl from '@salesforce/resourceUrl/lib';

export default class WebViewer extends LightningElement {

  handleFileSelected(file) {
    this.iframeWindow.postMessage({type: 'OPEN_DOCUMENT', file: file})
  }

  initUI() {
    const myObj = {
      libUrl: libUrl,
      fullAPI: false,
      namespacePrefix: '',
    };

    const viewerElement = this.template.querySelector('div');
    const viewer = new PDFTron.WebViewer({
      path: myObj.libUrl,
      fullAPI: myObj.fullAPI,
      custom: JSON.stringify(myObj),
      initialDoc: 'file.pdf',
      config: myfilesUrl + '/config.js',
    }, viewerElement);

    viewerElement.addEventListener('ready', () => {
      this.iframeWindow = viewerElement.querySelector('iframe').contentWindow
    });
  }
}
```

[zip_files]: https://www.pdftron.com/static/152614d12bf83c31602bb8f5e4eef27c/zip-files.png "Zip files"
[pdftron_app]: misc/pdftron_app.png "PDFTron app"
[webviewer]: misc/webviewer.png "WebViewer"
[app_launcher]: misc/app_launcher.png "App Launcher"
![](https://onepixel.pdftron.com/webviewer-salesforce)
