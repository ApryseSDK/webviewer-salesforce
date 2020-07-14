({
    doInit: function(cmp) {
    	console.log('doInit')
    },
    afterScriptsLoaded : function(component, event, helper) {
        console.log(component)
        var resourceLib = $A.get('$Resource.lib');
        var myObj = {
          libUrl: resourceLib,
          fullAPI: true,
          namespacePrefix: '',
        };

        var resourceConfig = $A.get('$Resource.myfiles') + '/config.js';
    	  var viewerElement = document.getElementById('viewer');
        var viewer = new PDFTron.WebViewer({
            path: resourceLib,
            config: resourceConfig,
            custom: JSON.stringify(myObj),
            fullAPI: myObj.fullAPI,
        }, viewerElement);

        viewerElement.addEventListener('ready', function() {
          // Call APIs here
          console.log(viewer);
          var iframeWindow = viewerElement.querySelector('iframe').contentWindow;
          iframeWindow.postMessage({type: 'OPEN_DOCUMENT', file: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf'}, '*');
        });
    }
})
// https://java-innovation-7128-dev-ed.lightning.force.com/static/lib/ui/build/index.html
// https://java-innovation-7128-dev-ed.lightning.force.com/resource/1549157318000/lib/webviewer.min.js
// https://developer.salesforce.com/blogs/developer-relations/2017/01/lightning-visualforce-communication.html