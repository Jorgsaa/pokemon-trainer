import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';

const apiUrl = 'https://jorgsaa-noroff-assignment-api.herokuapp.com/trainers/';
const apiKey =
  'uEzYwhrkm0OmaPQRfHSqz2OsKL8nsxK3AiqVkJkPjCv2lbiLnDyDkzOCGMm1A1gG';
const userStorageKey = 'user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users: User[] = [];
  private _user?: User;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    if (!this._user) {
      let localStorageUser = localStorage.getItem(userStorageKey);

      if (!!localStorageUser) {
        this._user = JSON.parse(localStorageUser!);
      }
    }
  }

  /*
    Registers new user with username.
    Private because method doesent check if user already exists in api.
  */
  private newUser(username: string) {
    this.http
      .post<User>(
        apiUrl,
        {
          username: username,
          pokemon: [],
        },
        {
          headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe((response) => {
        this._user = response;
        localStorage.setItem(userStorageKey, JSON.stringify(response));
        this.router.navigate(['/catalogue']);
      });
  }

  /*
    Login with username. 
    If username doesent exist, create new user with username.
    Routes to /catalogue page after login.
  */
  public login(username: string) {
    this.http
      .get<User[]>(apiUrl + `?username=${username}`)
      .subscribe((response) => {
        if (response.length === 0) {
          this.newUser(username);
        } else {
          this._user = response[0];
          localStorage.setItem(userStorageKey, JSON.stringify(response));
          this.router.navigate(['/catalogue']);
        }
      });
  }

  /*
    Catch pokemon
    Add pokemon to the user pokemon list in local storage and api
  */
  public catchPokemon(pokemonName: string): void {
    if (this._user) {
      this._user?.pokemon.push(pokemonName);

      this.http
        .patch<User>(
          apiUrl + this._user?.id,
          {
            pokemon: this._user?.pokemon,
          },
          {
            headers: {
              'X-API-Key': apiKey,
              'Content-Type': 'application/json',
            },
          }
        )
        .subscribe({
          next: (user) => (this._user = user),
          error: (error) => console.error('Error catching pokemon: ', error),
          complete: () =>
            localStorage.setItem(userStorageKey, JSON.stringify(this._user)),
        });
    }
  }

  /*
    Free pokemon
    Remove pokemon from the user pokemon list in local storage and api
  */
  public freePokemon(pokemonName: string): void {
    if (this._user) {
      const pokemonIndex = this._user?.pokemon.findIndex(
        (userPokemon) => userPokemon === pokemonName
      );

      if (pokemonIndex < 0) return;

      const newList = this._user?.pokemon;
      newList.splice(pokemonIndex, 1);

      this.http
        .patch<User>(
          apiUrl + this._user?.id,
          {
            pokemon: newList,
          },
          {
            headers: {
              'X-API-Key': apiKey,
              'Content-Type': 'application/json',
            },
          }
        )
        .subscribe({
          next: (user) => (this._user = user),
          error: (error) => console.error('Error catching pokemon: ', error),
          complete: () =>
            localStorage.setItem(userStorageKey, JSON.stringify(this._user)),
        });
    }
  }

  /*
    Logout and clear the user from localStorage.
    Route to root (landing page)
 */
  public logout() {
    this._user = undefined;
    localStorage.removeItem(userStorageKey);
    this.router.navigate(['']);
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
    VVVVV Temporary for testing purposes VVVVV
  */
  public setUser(user: User) {
    this._user = user;
  }

  public fetchContacts() {
    this.http.get<User[]>(apiUrl).subscribe({
      next: (users) => (this._users = users),
      error: (error) => console.error('Error fetching contacts: ', error),
      complete: () => console.info('complete (fetched trainers)'),
    });
  }

  public users(): User[] {
    return this._users;
  }
}
