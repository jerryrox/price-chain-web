import { BaseBloc } from "bindable-bloc";
import Api from "../../api/Api";
import NotificationBloc from "../NotificationBloc";
import BalanceState from "../states/BalanceState";
import LoginState from "../states/LoginState";
import WalletViewState from "../states/WalletViewState";

interface IWalletViewDependency {
    walletViewState: WalletViewState;

    balanceState: BalanceState;
    loginState: LoginState;

    notificationBloc: NotificationBloc;
}

export default class WalletViewBloc extends BaseBloc {
    
    readonly deps: IWalletViewDependency;

    get myAddress(): string {
        return this.deps.loginState.credential.value?.publicAddress as string;
    }
    
    constructor(deps: IWalletViewDependency) {
        super();
        this.deps = deps;
    }
    
    initState = async () => {
        this.resetFields();

        await this.loadBalance();
    };

    loadBalance = async () => {
        try {
            const address = this.myAddress;
            const balance = await Api.getBalance(address);

            this.deps.balanceState.balance.value = balance;
        }
        catch (e) {
            this.deps.notificationBloc.addError(e.message);
        }
    };

    setAmount = (amount: string) => this.deps.walletViewState.amount.value = amount.trim();

    setAddress = (address: string) => this.deps.walletViewState.address.value = address.trim();

    sendTokens = async () => {
        const balance = this.deps.balanceState.balance.value;
        const amount = this.deps.walletViewState.amountNumber;
        const address = this.deps.walletViewState.address.value;
        if (!this.validateTokenSend(balance, amount, address)) {
            return;
        }

        const myAddress = this.myAddress;
        try {
            await Api.sendToken(myAddress, address, amount);
        }
        catch (e) {
            this.deps.notificationBloc.addError(e.message);
            return;
        }

        this.deps.notificationBloc.add({
            message: "Request sent. Please wait for a moment to finalize the transaction.",
            variant: "success",
        });
        this.resetFields();
    };

    private resetFields = () => {
        this.deps.walletViewState.amount.value = "0";
        this.deps.walletViewState.address.value = "";
    };

    private validateTokenSend = (balance: number, amount: number, address: string): boolean => {
        if (amount <= 0) {
            this.deps.notificationBloc.addError("Amount must be greater than 0.");
            return false;
        }
        if (balance < amount) {
            this.deps.notificationBloc.addError("You don't have enough balance.");
            return false;
        }
        if (address.length === 0) {
            this.deps.notificationBloc.addError("Please enter a recipient address.");
            return false;
        }
        return true;
    };
}