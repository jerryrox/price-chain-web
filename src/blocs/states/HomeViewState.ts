import { BaseBloc, Bindable } from "bindable-bloc";

export default class HomeViewState extends BaseBloc {
    
    readonly publicAddress = new Bindable<string>("");
    readonly privateAddress = new Bindable<string>("");
}