import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  public sales;

  constructor() {
  }

  ngOnInit() {
    this.sales = [
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
