import { LightningElement, track } from 'lwc';
import { publish, createMessageContext, releaseMessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import lmsWebviewer from "@salesforce/messageChannel/LMSWebViewer__c";

export default class PdftronTabViewer extends LightningElement {
    //LMS
    @track receivedMessage = '';
    currentLink;
    channel;
    context = createMessageContext();

    @track tabs = []; //push {label:'',link:''} to this array
    showTabs = false;

    connectedCallback() {
        this.handleSubscribe();
        if (this.showTabs === false) {
            if (typeof this.tabs.length !== '' && this.tabs.length) {

            }
        }
    }

    disconnectedCallback() {
        this.handleUnsubscribe();
    }

    handleActive(event) {
        console.log(`Current doc: ${event.target.label}, link: ${event.target.value}`);
        //pass event.target.value to WebViewer here
        this.currentLink = event.target.value;
    }

    handleSubscribe() {
        const parentPage = this;
        this.channel = subscribe(this.context, lmsWebviewer, (event) => {
            if (event != null) {
                console.log(event);
                this.tabs = [];
                event.link.forEach((link) => {
                    const label = link.substring(link.lastIndexOf("/") + 1);
                    console.log(label);
                    const option = { label: label, value: link };
                    if (!this.tabs.includes(option)) {
                        this.tabs = [...this.tabs, option];
                        this.showTabs = true;
                    } else {
                        let idx = this.tabs.indexOf(option);
                        this.tabs = this.tabs.splice(idx, 1);
                    }
                });
            }
        });
    }

    handleUnsubscribe() {
        unsubscribe(this.channel);
    }
}