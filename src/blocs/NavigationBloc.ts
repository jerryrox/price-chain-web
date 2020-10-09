import { BaseBloc } from "bindable-bloc";
import * as H from "history";

export default class NavigationBloc extends BaseBloc {

    history: H.History<any> | null = null;
    

    setHistory = (history: H.History<any> | null) => {
        this.history = history;
    };

    toHome = () => this.history?.push("/");

    toSearch = () => this.history?.push("/search");

    toDashboard = () => this.history?.push("/dashboard");

    toWallet = () => this.history?.push("/wallet");

    toManage = () => this.history?.push("/manage");
}