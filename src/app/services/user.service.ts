import { HttpClient, } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { catchError, Observable, pipe } from "rxjs";
import { User } from "../models";

const apiUrl = "https://jorgsaa-noroff-assignment-api.herokuapp.com/trainers/";
const apiKey = "uEzYwhrkm0OmaPQRfHSqz2OsKL8nsxK3AiqVkJkPjCv2lbiLnDyDkzOCGMm1A1gG";
const userStorageKey = "user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user?: User;

  constructor(
    private readonly http: HttpClient,
  ) {}

  /*
    Registers new user with username.
    Private because method doesent check if user already exists in api.
  */
  private newUser(username: string) {      
    this.http.post<User[]>(apiUrl, 
      {
        "username": username,
        "pokemon": []
      },
      {
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json'
        }
      })
    .subscribe(response => {
      this._user = response[0];      
      localStorage.setItem(userStorageKey, JSON.stringify(response))
    });   
  }

  /*
    Login with username. 
    If username doesent exist, create new user with username.
  */
  public login(username: string) {
    this.http.get<User[]>(apiUrl + `?username=${username}`)
      .subscribe(response => {
        if(response.length === 0) {
          this.newUser(username);
        } else {
          this._user = response[0];
          localStorage.setItem(userStorageKey, JSON.stringify(response))
        }
      });
  }

  public logout() {
    localStorage.removeItem(userStorageKey);
  }

  /*
    Get currently logged in user, or undefined if not logged in.
  */
  public getCurrentUser(): User | undefined {
    return this._user;
  }

  /*
    Get current users pokemons, or undefined if not logged in.
  */
  public getCurrentUserPokemons(): string[] | undefined {
    return this._user?.pokemon;
  
  }
  
  /*
    Get all users from API.
  */
  /*public fetchContacts() {
    this.http.get<User[]>('https://jorgsaa-noroff-assignment-api.herokuapp.com/trainers')
    .subscribe({
      next: (users) => this._users = users,
      error: (error) => this._error = error,
      complete: () => console.info('complete (fetched trainers)')
    })
  }

  public users(): User[] {
    return this._users;
  }

  public error(): string {
    return this._error;
  }*/
}
