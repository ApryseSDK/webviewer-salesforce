import { LightningElement, track, wire, api } from 'lwc';
import myfilesUrl from '@salesforce/resourceUrl/myfiles';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class FilePickerCombobox extends LightningElement {
    @track value = 'inProgress';
    @track fileUrl = '';
    @wire(CurrentPageReference) pageRef;
    @api myRecordId;

    get acceptedFormats() {
        return ['.pdf', '.png'];
    }
    handleButton(event) {
        fireEvent(this.pageRef, 'fileSelected', this.fileUrl);
    } 

    handleFilePick(event) {
        console.log(event.target.files[0])
        fireEvent(this.pageRef, 'fileSelected', event.target.files[0]);
    }

    handleUrlInput(event) {
        this.fileUrl = event.target.value;
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        alert("No. of files uploaded : " + uploadedFiles.length);
    }

    get options() {
        return [
            { label: 'webviewer-demo-annotated.pdf', value: myfilesUrl + '/webviewer-demo-annotated.pdf' },
            { label: 'compressed.tracemonkey-pldi-09.pdf', value: myfilesUrl + '/compressed.tracemonkey-pldi-09.pdf' },
            { label: 'webviewer-demo-annotated.xod', value: myfilesUrl + '/webviewer-demo-annotated.xod' },
            { label: 'word.docx', value: myfilesUrl + '/word.docx' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        fireEvent(this.pageRef, 'fileSelected', this.value);
    }
}
