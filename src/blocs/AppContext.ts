import { BlocContextValue } from "bindable-bloc";
import { createContext } from "react";
import NavigationBloc from "./NavigationBloc";
import AppDrawerState from "./states/AppDrawerState";
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

    const navigationBloc = new NavigationBloc();

    const appDrawerState = new AppDrawerState();
    const appDrawerBloc = new AppDrawerBloc({
        appDrawerState
    });

    const navBarBloc = new NavBarBloc({
        appDrawerBloc
    });

    const homeViewBloc = new HomeViewBloc({
    });

    const walletViewState = new WalletViewState();
    const walletViewBloc = new WalletViewBloc({
        walletViewState,
    });

    return new BlocContextValue({
        userState,
        loginState,

        navigationBloc,

        appDrawerState,
        appDrawerBloc,

        navBarBloc,

        homeViewBloc,

        walletViewState,
        walletViewBloc,
    });
}

const AppContext = createContext<BlocContextValue>(new BlocContextValue());
export default AppContext;