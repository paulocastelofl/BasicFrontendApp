import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenJwt: string = "";
  private userData = new BehaviorSubject<IUser>(undefined);

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  setUser(user: IUser): void {
    
    this.setLocalStorage(user );
    this.userData.next(user);
  }

  getUser(): Observable<IUser> {
    return this.userData.asObservable();
  }

  get Token(): string {
    return this.tokenJwt;
  }


  public authenticUser(parms: {}): Observable<any> {

    return this.httpClient.post(`${environment.baseUrlBackend}/Auth/Login`,
      parms
    ).pipe(
        tap(r => {
          this.tokenJwt = r.token
          this.setUser(r)
        })
      );

  }


  setLocalStorage(parms) {
    const now = new Date();
    localStorage.setItem('credencials-castelodev', JSON.stringify({
      id: parms['id'],
      name: parms['name'],
      email: parms['email'],
      date: now,
      token: parms['token'],
      igreja: parms['igreja']
    }));
  }

  logout() {
    localStorage.removeItem('credencials-castelodev');
    this.setUser({});
    this.router.navigate(['pages/login']);
  }

  getIsAuthentic(): boolean {
    let credencials = JSON.parse(localStorage.getItem('credencials-castelodev'));

    if (credencials == undefined) return false;

    var now = new Date();
    const dateUser = new Date(credencials['date']);
    dateUser.setHours(dateUser.getHours() + 1);

    if (now > dateUser) {
      this.logout();
      return false;
    } else {

      this.setUser(credencials);
      this.tokenJwt = credencials['token'];
      return true;
    }

  }
}
