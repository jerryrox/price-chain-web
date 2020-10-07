import { BlocContextValue } from "bindable-bloc";
import { createContext } from "react";
import AppDrawerState from "./states/AppDrawerState";
import LoginState from "./states/LoginState";
import UserState from "./states/UserState";
import AppDrawerBloc from "./ui/AppDrawerBloc";
import NavBarBloc from "./ui/NavBarBloc";

export function initContextValue(): BlocContextValue {

    const userState = new UserState();
    const loginState = new LoginState();

    const appDrawerState = new AppDrawerState();
    const appDrawerBloc = new AppDrawerBloc({
        appDrawerState
    });

    const navBarBloc = new NavBarBloc({
        appDrawerBloc
    });

    return new BlocContextValue({
        userState,
        loginState,

        appDrawerState,
        appDrawerBloc,

        navBarBloc,
    });
}

const AppContext = createContext<BlocContextValue>(new BlocContextValue());
export default AppContext;