import { BaseBloc } from "bindable-bloc";
import elliptic from "elliptic";
import AddressVerifier from "../../libs/AddressVerifier";
import UserType from "../../models/UserType";
import NavigationBloc from "../NavigationBloc";
import NotificationBloc from "../NotificationBloc";
import HomeViewState from "../states/HomeViewState";
import LoginState from "../states/LoginState";
import UserState from "../states/UserState";

interface IHomeViewDependency {
    homeViewState: HomeViewState;

    loginState: LoginState;
    userState: UserState;

    navigationBloc: NavigationBloc;
    notificationBloc: NotificationBloc;
}

export default class HomeViewBloc extends BaseBloc {
    
    readonly deps: IHomeViewDependency;
    
    constructor(deps: IHomeViewDependency) {
        super();
        this.deps = deps;
    }

    initState = () => {
        this.deps.homeViewState.publicAddress.value = "";
        this.deps.homeViewState.privateAddress.value = "";
    };

    setPublicAddress = (address: string) => this.deps.homeViewState.publicAddress.value = address.trim();
    
    setPrivateAddress = (address: string) => this.deps.homeViewState.privateAddress.value = address.trim();

    continueAsCustomer = () => {
        if (!this.logIn()) {
            return;
        }
        this.deps.userState.userType.value = UserType.customer;
    };

    continueAsShopOwner = () => {
        if (!this.logIn()) {
            return;
        }
        this.deps.userState.userType.value = UserType.shopOwner;
    };

    toWallet = () => {
        this.deps.navigationBloc.toWallet();
    };

    toManage = () => {
        this.deps.navigationBloc.toManage();
    };

    logout = () => {
        this.deps.loginState.credential.value = null;
        this.deps.userState.userType.value = UserType.anonymous;
    };

    private logIn = (): boolean => {
        const homeViewState = this.deps.homeViewState;
        const publicAddress = homeViewState.publicAddress.value;
        const privateAddress = homeViewState.privateAddress.value;
        if (!this.validateLoginValues(publicAddress, privateAddress)) {
            return false;
        }

        this.deps.loginState.credential.value = {
            privateAddress,
            publicAddress
        };
        return true;
    };

    private validateLoginValues = (publicAddress: string, privateAddress: string): boolean => {
        if (publicAddress.length <= 0) {
            this.deps.notificationBloc.addError("Please enter a public address.");
            return false;
        }
        if (privateAddress.length <= 0) {
            this.deps.notificationBloc.addError("Please enter a private address.");
            return false;
        }
        if (!AddressVerifier.verify(publicAddress, privateAddress)) {
            this.deps.notificationBloc.addError("Failed to verify addresses.");
            return false;
        }

        return true;
    };
}