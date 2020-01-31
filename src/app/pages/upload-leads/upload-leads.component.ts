import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-leads',
  templateUrl: './upload-leads.component.html',
  styleUrls: ['./upload-leads.component.css']
})
export class UploadLeadsComponent implements OnInit {

  public csvRecords: any[] = [];
  public headersRow = [];
  public tooltipMessage = '';
  public noError = false;

  constructor() {
  }

  isCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    const headers = csvRecordsArr[0].split(',');
    const headerArray = [];

    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const dataArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const data = csvRecordsArray[i].split(',');
      // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
      // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA

      if (data.length === headerLength) {
        const csvRecord = {
          firstName: data[0].trim(),
          lastName: data[1].trim(),
          email: data[2].trim(),
          phoneNumber: data[3].trim()
        };

        dataArr.push(csvRecord);
      }
    }
    return dataArr;
  }

  fileChangeListener($event: any): void {
    const text = [];
    const files = $event.srcElement.files;

    if (this.isCSVFile(files[0])) {
      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = (data) => {
        const csvData = reader.result;
        const csvRecordsArray = csvData.split(/\r\n|\n/);
        this.headersRow = this.getHeaderArray(csvRecordsArray);
        this.csvRecords =
          this.getDataRecordsArrayFromCSVFile(csvRecordsArray,
            this.headersRow.length);

        this.noError = true;
        this.tooltipMessage = 'Looks good!';
      };

      reader.onerror = () => {
        this.tooltipMessage = ('Unable to read ' + input.files[0]);
      };
    } else {
      this.tooltipMessage = 'Please import valid .csv file.';
      this.fileReset();
    }
  }

  fileReset() {
    this.csvRecords = [];
    this.headersRow = [];
  }

  ngOnInit() {
  }

}
