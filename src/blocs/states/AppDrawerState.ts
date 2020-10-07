import { BaseBloc, Bindable } from "bindable-bloc";

export default class AppDrawerState extends BaseBloc {
    
    readonly isOpen = new Bindable<boolean>(false);
}