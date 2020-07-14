function initWebViewer(options) {
  console.log(options);

  var myObj = {
    libUrl: options.lib,
    fullAPI: true,
    namespacePrefix: '',
  };
  var resourceConfig = options.myfiles + '/config.js';

  WebViewer(
    {
      path: options.lib,
      custom: JSON.stringify(myObj),
      config: resourceConfig,
      fullAPI: myObj.fullAPI,
      // initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
    },
    document.getElementById('viewer')
  ).then(instance => {
    console.log(instance);
    instance.loadDocument('https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf')
    // Use WebViewer API here
  })
}
