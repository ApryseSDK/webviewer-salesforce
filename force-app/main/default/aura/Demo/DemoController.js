({
    scriptsLoaded : function(component, event, helper) {
      console.log('scriptsLoaded',this);
      var viewerElement = document.getElementById('viewer');
      var url = 'https://ruby-page-2348-dev-ed.lightning.force.com/resource/1549157318000/myfiles/compressed.tracemonkey-pldi-09.pdf';
      var myWebViewer = new PDFTron.WebViewer({
        path: '/resource/1549157318000/lib/', // path to the PDFTron 'lib' folder on your server
        l: 'demo:sisakov@pdftron.com:750d07bd01a53f57075ae2b0404e99b52d2335d64b4a5e4767',
        initialDoc: url,
        // initialDoc: '/path/to/my/file.pdf',  // You can also use documents on your server
      }, viewerElement);
      viewerElement.addEventListener('ready', function() {
        var viewerInstance = myWebViewer.getInstance(); // instance is ready here

        // Call APIs here
      });
    }
})
//https://java-innovation-7128-dev-ed.lightning.force.com/static/lib/ui/build/index.html
//https://java-innovation-7128-dev-ed.lightning.force.com/resource/1549157318000/lib/webviewer.min.js
// https://developer.salesforce.com/blogs/developer-relations/2017/01/lightning-visualforce-communication.html