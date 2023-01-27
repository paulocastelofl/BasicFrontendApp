import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  authenticUser(parms: {}) {

    if (parms['email'] == "admin@ganedencomex.com" && parms['password'] == "admin") {
      this.setLocalStorage(parms);
      this.router.navigate(['/dashboard']);
    }

  }

  setLocalStorage(parms) {
    const now = new Date();
    localStorage.setItem('credencials-ganedencomex', JSON.stringify({
      email: parms['email'],
      date: now
    }));
  }

  logout() {
    localStorage.removeItem('credencials-ganedencomex');
    this.router.navigate(['pages/login']);
  }

  getIsAuthentic(): boolean {
    let credencials = JSON.parse(localStorage.getItem('credencials-ganedencomex'));

    if(credencials == undefined) return false;

    var now = new Date();
    const dateUser = new Date(credencials['date']);
    dateUser.setHours(dateUser.getHours() + 1);

    if(now > dateUser){
      this.logout();
      return false;
    }else{
      return true;
    }
    
  }
}
