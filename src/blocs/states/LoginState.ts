import { BaseBloc, Bindable } from "bindable-bloc";
import { ICredential } from "../../libs/types";

export default class LoginState extends BaseBloc {
    
    readonly credential = new Bindable<ICredential | null>(null);
    readonly isLoggedIn = new Bindable<boolean>(false);

    constructor() {
        super();
        this.credential.subscribe((c) => this.isLoggedIn.value = c !== null);
    }
}