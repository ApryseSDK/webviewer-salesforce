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
          { label: 'Issue2_Original_Docx_File.docx', value: myfilesUrl + '/Issue2_Original_Docx_File.docx'},
          { label: 'Issue2_Original_Docx_File_(2).docx', value: myfilesUrl + '/Issue2_Original_Docx_File_(2).docx'},
          { label: 'Issue4_Original.docx', value: myfilesUrl + '/Issue4_Original.docx'},
          { label: 'Issue6_Original_Docx.docx', value: myfilesUrl + '/Issue6_Original_Docx.docx'},
          { label: 'MB_2_Line_Items_Version_2.docx', value: myfilesUrl + '/MB_2_Line_Items_Version_2.docx'},
          { label: 'OriginalDocument.docx', value: myfilesUrl + '/OriginalDocument.docx'},
          { label: 'US-3050-FR-Helvetica_Change_Contract_Long_template_V2.1.docx', value: myfilesUrl + '/US-3050-FR-Helvetica_Change_Contract_Long_template_V2.1.docx'},
          { label: 'Version_25_expected.pdf', value: myfilesUrl + '/Version_25_expected.pdf'},
          { label: 'WeirdEmbeddedFonts.docx', value: myfilesUrl + '/WeirdEmbeddedFonts.docx'},
          { label: 'Zurich_Version_1.docx', value: myfilesUrl + '/Zurich_Version_1.docx'},
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
