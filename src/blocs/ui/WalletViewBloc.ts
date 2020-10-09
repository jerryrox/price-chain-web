import { BaseBloc } from "bindable-bloc";
import WalletViewState from "../states/WalletViewState";

interface IWalletViewDependency {
    walletViewState: WalletViewState;
}

export default class WalletViewBloc extends BaseBloc {
    
    readonly deps: IWalletViewDependency;
    
    constructor(deps: IWalletViewDependency) {
        super();
        this.deps = deps;
    }
    
    initState = () => {
        this.deps.walletViewState.amount.value = "0";
        this.deps.walletViewState.address.value = "";
    };

    setAmount = (amount: string) => this.deps.walletViewState.amount.value = amount.trim();

    setAddress = (address: string) => this.deps.walletViewState.address.value = address.trim();

    sendTokens = () => {
        // TODO:
    };
}