import { BaseBloc } from "bindable-bloc";
import BalanceState from "../states/BalanceState";
import LoginState from "../states/LoginState";
import WalletViewState from "../states/WalletViewState";

interface IWalletViewDependency {
    walletViewState: WalletViewState;

    balanceState: BalanceState;
    loginState: LoginState;
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
        const balance = this.deps.balanceState.balance.value;
        const amount = this.deps.walletViewState.amountNumber;
        const address = this.deps.walletViewState.address.value;
        if (!this.validateTokenSend(balance, amount, address)) {
            return;
        }

        // TODO:
    };

    private validateTokenSend = (balance: number, amount: number, address: string): boolean => {
        if (amount <= 0) {
            // TODO: Error
            return false;
        }
        if (balance < amount) {
            // TODO: Error
            return false;
        }
        if (address.length === 0) {
            // TODO: Error
            return false;
        }
        return true;
    };
}