import { BaseBloc, Bindable } from "bindable-bloc";

export default class BalanceState extends BaseBloc {
    
    readonly balance = new Bindable<number>(0);
}