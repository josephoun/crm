import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/user.model';

@Injectable({providedIn: 'root'})
export class UserService {

  apiUrl = 'http://localhost:4200';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<UserModel[]>(`${this.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get<UserModel>(`${this.apiUrl}/users/${id}`);
  }
}
