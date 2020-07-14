<aura:application extends="force:slds">
  <ltng:require scripts="{!join(',',
        $Resource.lib + '/webviewer.min.js')}" afterScriptsLoaded="{!c.afterScriptsLoaded}" />

  <!-- Stand-alone static resources -->
	<aura:handler name="init" value="{!this}" action="{!c.doInit}"/>

  <div class="slds-text-heading_large slds-text-align_center slds-box">
      My Demo app
  </div>

  <div id="viewer"></div>

</aura:application>