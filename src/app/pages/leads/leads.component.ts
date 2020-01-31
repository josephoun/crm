import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  public leads;

  constructor() { }

  ngOnInit() {
    this.leads = [
      {
        id: 1,
        name: 'Joseph',
        email: 'josephoun@hotmail.com'
      },
      {
        id: 2,
        name: 'Eyas',
        email: 'eyas@hotmail.com'
      }
    ];
  }

}
