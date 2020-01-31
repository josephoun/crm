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
  public exampleFile = [];

  constructor() {
    this.exampleFile = [
      {
        firstName: 'Anil',
        lastName: 'Singh',
        email: 'anil@hotmail.com',
        phoneNumber: 234213
      },
      {
        firstName: 'Sam',
        lastName: 'gfah',
        email: 'sam@hotmail.com',
        phoneNumber: 3462363
      },
      {
        firstName: 'kim',
        lastName: 'asd',
        email: 'kim@hotmail.com',
        phoneNumber: 214314
      }
    ];
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

  ConvertToCSV(objArray, headerList) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';

    for (const index in headerList) {
      row += headerList[index] + ',';
    }
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in headerList) {
        const head = headerList[index];

        line +=  array[i][head] + ',';
      }
      str += line + '\r\n';
    }
    return str;
  }

  downloadFile(data, filename= 'data') {
    const csvData = this.ConvertToCSV(data, ['firstName', 'lastName', 'email', 'phoneNumber']);
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
    if (isSafariBrowser) {  // if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  fileReset() {
    this.csvRecords = [];
    this.headersRow = [];
  }

  downloadExampleFile() {
    this.downloadFile(this.exampleFile, 'example');
  }

  ngOnInit() {
  }

}
