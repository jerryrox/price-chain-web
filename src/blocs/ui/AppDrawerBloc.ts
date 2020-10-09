import { BaseBloc } from "bindable-bloc";
import UserType from "../../models/UserType";
import NavigationBloc from "../NavigationBloc";
import AppDrawerState from "../states/AppDrawerState";
import LoginState from "../states/LoginState";
import UserState from "../states/UserState";
import BlockchainOverlayBloc from "./BlockchainOverlayBloc";
import BlockOverlayBloc from "./BlockOverlayBloc";

interface IAppDrawerDependency {
    appDrawerState: AppDrawerState;

    loginState: LoginState;
    userState: UserState;

    navigationBloc: NavigationBloc;
    blockchainOverlayBloc: BlockchainOverlayBloc;
    blockOverlayBloc: BlockOverlayBloc;
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

    toManage = () => {
        this.deps.navigationBloc.toManage();
        this.closeDrawer();
    };

    debugChain = () => {
        this.deps.blockchainOverlayBloc.show();
    };

    debugBlock = () => {
        this.deps.blockOverlayBloc.show();
    };

    logout = () => {
        this.deps.navigationBloc.toHome();
        this.deps.loginState.credential.value = null;
        this.deps.userState.userType.value = UserType.anonymous;
    };
}