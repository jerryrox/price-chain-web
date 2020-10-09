import { BaseBloc, Bindable } from "bindable-bloc";

export default class WalletViewState extends BaseBloc {
    
    readonly amount = new Bindable<string>("0");
    readonly address = new Bindable<string>("");

    get amountNumber(): number {
        try {
            const num = parseInt(this.amount.value, 10);
            if (num === null || num === undefined || Number.isNaN(num)) {
                throw new Error(`Could not parse amount to number: ${this.amount.value}`);
            }
            return num;
        }
        catch (e) {
            console.log("Error while parsing amount to number", e);
            return 0;
        }
    }
}