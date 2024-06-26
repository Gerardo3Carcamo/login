import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getUser(): string | null {
    return localStorage.getItem('session-variable')
  }

  setUser(userData: string){
    localStorage.setItem('session-variable', userData)
  }

  removeUser(){
    localStorage.removeItem('session-variable')
  }

}
