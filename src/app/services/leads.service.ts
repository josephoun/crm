import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BASE_URL, SUB_URL} from '../constants/network';
import {LeadModel} from '../models/lead.model';

@Injectable({providedIn: 'root'})
export class LeadsService {

  public leads = {
    rows: [],
    count: 0
  };

  private _page = 1;

  private _limit = 20;

  private _cursor = null;

  constructor(private http: HttpClient) {
  }

  addLead(lead: LeadModel) {
    return this.http.post<any>(`${BASE_URL}${SUB_URL.LEADS.ADD_LEAD.url}`, lead)
      .subscribe(res => {
        this.getLeads();
      }, err => {
        alert(' addLead error ' + err);
      });
  }

  getLeads() {
    const params = {
      page: `${this._page}`,
      limit: `${this._limit}`,
    };
    return this.http.get<any>(`${BASE_URL}${SUB_URL.LEADS.GET_LEADS.url}`, { params })
      .subscribe(res => {
      this.leads.rows = res.rows;
      this.leads.count = res.count;
      });
  }
}
