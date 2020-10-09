import { useBindable } from "bindable-bloc";
import { useContext, useEffect } from "react";
import AppContext from "../blocs/AppContext";
import LoginState from "../blocs/states/LoginState";

interface IUserAuthParam {
    whenUnauth?: () => void,
    whenAuth?: () => void,
}

export default function useAuth(param?: IUserAuthParam): boolean {
    const invokeWhenUnauth = () => (param?.whenUnauth ?? (() => { }))();
    const invokeWhenAuth = () => (param?.whenAuth ?? (() => { }))();

    const loginState = useContext(AppContext).getBloc(LoginState);
    const isLoggedIn = useBindable(loginState.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            invokeWhenAuth();
        }
        else {
            invokeWhenUnauth();
        }
    }, [isLoggedIn]); // eslint-disable-line
    return isLoggedIn;
}