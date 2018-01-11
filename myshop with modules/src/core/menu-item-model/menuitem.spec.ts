import { LoginMenuItem } from "./menuItem";
import { LoginSevice } from "../login-service/loginservice";
class LoginServiceMock extends LoginSevice{
    constructor(public _fakedIsLoggedIn:boolean) {
        super([]);
        
    }

    get isLogedIn():boolean{
        return this._fakedIsLoggedIn;
    }

    set isLogedIn(value:boolean){
    }
}

describe('LoginMenuItem test', () => {

    it(`should be visible when user is not logged in`, (() => {
        let loginService = new LoginServiceMock(false);
        let menuItem = new LoginMenuItem("", loginService, "");
        expect(menuItem.active).toBe(true);
    }));

    it(`should be hidden when user logged in`, (() => {
        let loginService = new LoginServiceMock(true);
        let menuItem = new LoginMenuItem("", loginService, "");
        expect(menuItem.active).toBe(false);
    }));

  });