import { BlocContextValue } from "bindable-bloc";
import { createContext } from "react";
import NavigationBloc from "./NavigationBloc";
import NotificationBloc from "./NotificationBloc";
import AppDrawerState from "./states/AppDrawerState";
import BalanceState from "./states/BalanceState";
import HomeViewState from "./states/HomeViewState";
import LoginState from "./states/LoginState";
import UserState from "./states/UserState";
import WalletViewState from "./states/WalletViewState";
import AppDrawerBloc from "./ui/AppDrawerBloc";
import HomeViewBloc from "./ui/HomeViewBloc";
import NavBarBloc from "./ui/NavBarBloc";
import WalletViewBloc from "./ui/WalletViewBloc";

export function initContextValue(): BlocContextValue {

    const userState = new UserState();
    const loginState = new LoginState();
    const balanceState = new BalanceState();

    const navigationBloc = new NavigationBloc();
    const notificationBloc = new NotificationBloc();

    const appDrawerState = new AppDrawerState();
    const appDrawerBloc = new AppDrawerBloc({
        appDrawerState, loginState, navigationBloc,
        userState,
    });

    const navBarBloc = new NavBarBloc({
        appDrawerBloc
    });

    const homeViewState = new HomeViewState();
    const homeViewBloc = new HomeViewBloc({
        homeViewState, loginState, userState,
        navigationBloc, notificationBloc,
    });

    const walletViewState = new WalletViewState();
    const walletViewBloc = new WalletViewBloc({
        walletViewState, balanceState, loginState,
        notificationBloc,
    });

    return new BlocContextValue({
        userState,
        loginState,
        balanceState,

        navigationBloc,
        notificationBloc,

        appDrawerState,
        appDrawerBloc,

        navBarBloc,

        homeViewState,
        homeViewBloc,

        walletViewState,
        walletViewBloc,
    });
}

const AppContext = createContext<BlocContextValue>(new BlocContextValue());
export default AppContext;