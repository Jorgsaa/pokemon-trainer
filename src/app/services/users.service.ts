import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { User } from "../models";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users: User[] = [];
  private _error: string = '';

  constructor(
    private readonly http: HttpClient,
  ) {}

  // Fetch all users
  public fetchContacts(): void {
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
  }

  public fetchUser(username: string): Observable<User | undefined> {
    return this.http.get<User[]>('https://jorgsaa-noroff-assignment-api.herokuapp.com/trainers')
    .pipe(
      map<User[], User | undefined>(users => users.find(user => user.username === username))
    )
  }
}
