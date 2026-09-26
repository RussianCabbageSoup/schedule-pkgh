import { makeAutoObservable } from "mobx";

export default class UserStore {
    _isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIsAuth(bool: boolean) {
        this._isAuth = bool;
    }

    get isAuth() {
        return this._isAuth;
    }
}