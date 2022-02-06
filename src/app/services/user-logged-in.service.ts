import { Injectable } from "@angular/core";
import { User } from "../models";

@Injectable({
    providedIn: 'root'
})
export class UserLoggedInService {
    private _user?: User;

    public setUser(user: User) {
        this._user = user;
    }

    public user(): User | undefined {
        return this._user;
    }

    public pokemons(): string[] | undefined {
        return this._user?.pokemon;
    }
}