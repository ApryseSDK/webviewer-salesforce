({
  myAction : function(component, event, helper) {

  },
  reInit : function(component, event, helper) {
    console.log('reInit')
    var lwcElm = component.getElement();
    lwcElm.openDocument();
  },
  update : function (component, event, helper) {
    var lwcElm = component.getElement();
    setTimeout(() => {
      lwcElm.closeDocument();
    }, 100);
  }
})