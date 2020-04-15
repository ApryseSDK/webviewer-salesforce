import { LightningElement, wire, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
/** ContentVersionController.getContentVersions() Apex method */
import getContentVersions from '@salesforce/apex/ContentVersionController.getContentVersions';

const actions = [
  { label: 'Show details', name: 'show_details' },
  { label: 'Open with WebViewer', name: 'open_with_webviewer' }
];

const columns = [
  { label: 'Id', fieldName: 'Id' },
  { label: 'Title', fieldName: 'Title', sortable: true },
  { label: 'Extension', fieldName: 'FileExtension', sortable: true },
  { label: 'Last Modified Date', fieldName: 'LastModifiedDate', type: "date", sortable: true,
    typeAttributes:{
      hour12: true,
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }
  },
  { type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'right' } },
];


export default class WvFileBrowserComponent extends NavigationMixin(LightningElement) {
  @api tabName;
  @api label;
  @track contentVersions;
  columns = columns;

  @wire(getContentVersions, {})
  handleGeRecords({error, data}){
    if (error) {
      return;
    }

    if (data) {
      this.contentVersions = data;
    }
  }

  log(...str) {
    console.log(JSON.parse(JSON.stringify(str)));

  }

  connectedCallback() {
    console.log(`%c connectedCallback `, 'background: red; color: white;');
  }

  handleRowAction(event) {
    console.log(`%c handleRowAction `, 'background: red; color: white;');
    const action = event.detail.action;
    const row = event.detail.row;
    switch (action.name) {
      case 'show_details':
        alert('Showing Details: ' + JSON.stringify(row));
        break;
      case 'open_with_webviewer':
        // open with wv
        this.navigateToWvInstance(row);
        break;
     }
  }

  navigateToWvInstance(row) {
     this[NavigationMixin.Navigate]({
      type: 'standard__component',
      attributes: {
        componentName: 'c__WebViewerAura'
      },
      state: {
        c__contentVersionId: row.Id,
      }
    })
  }

  // The method onsort event handler
  updateColumnSorting(event) {

    var fieldName = event.detail.fieldName;
    var sortDirection = event.detail.sortDirection;
    // assign the latest attribute with the sorted column fieldName and sorted direction
    this.sortedBy = fieldName;
    this.sortedDirection = sortDirection;
    this.contentVersions = this.sortData(fieldName, sortDirection);
  }

  sortData(fieldName, sortDirection) {
    console.log(`%c sortData ${fieldName} ${sortDirection} `, 'background: red; color: white;');
    let result;
    // switch (fieldName) {
    //   case 'LastModifiedDate':
    //     result = this.contentVersions.sort((a, b) => b.LastModifiedDate - a.LastModifiedDate)
    //     break;
    //   default:
    //     result = this.contentVersions;
    //     break;
    // }
    return this.contentVersions;
  }
}