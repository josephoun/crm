import { Component, OnInit } from '@angular/core';
import {LeadsService} from '../../services/leads.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  public leads;

  constructor(private leadsService: LeadsService) {
    this.leads = this.leadsService.leads;
    this.leadsService.getLeads();
  }

  ngOnInit() {}

}
