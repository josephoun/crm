import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BASE_URL} from '../constants/network';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private _token;

  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getToken() {
    return this._token;
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${BASE_URL}auth`, {email: username, password})
      .pipe(
        map(res => {
          if (res && res.user && res.token) {
            this._token = res.token;

            localStorage.setItem('currentUser', JSON.stringify(res.user));
            this.currentUserSubject.next(res.user);
          }
          return res.user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this._token = '';
  }
}
