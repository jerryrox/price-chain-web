import { BaseBloc } from "bindable-bloc";
import { UserType } from "../../libs/types";
import NavigationBloc from "../NavigationBloc";
import AppDrawerState from "../states/AppDrawerState";
import LoginState from "../states/LoginState";
import UserState from "../states/UserState";

interface IAppDrawerDependency {
    appDrawerState: AppDrawerState;

    loginState: LoginState;
    userState: UserState;

    navigationBloc: NavigationBloc;
}

export default class AppDrawerBloc extends BaseBloc {
    
    readonly deps: IAppDrawerDependency;
    
    constructor(deps: IAppDrawerDependency) {
        super();
        this.deps = deps;
    }
    
    initState = () => {

    };

    showDrawer = () => this.deps.appDrawerState.isOpen.value = true;

    closeDrawer = () => this.deps.appDrawerState.isOpen.value = false;

    toHome = () => {
        this.deps.navigationBloc.toHome();
        this.closeDrawer();
    };

    toSearch = () => {
        this.deps.navigationBloc.toSearch();
        this.closeDrawer();
    };

    toWallet = () => {
        this.deps.navigationBloc.toWallet();
        this.closeDrawer();
    };

    debugChain = () => {
        // TODO:
    };

    debugBlock = () => {
        // TODO:
    };

    logout = () => {
        this.deps.navigationBloc.toHome();
        this.deps.loginState.credential.value = null;
        this.deps.userState.userType.value = UserType.anonymous;
    };
}