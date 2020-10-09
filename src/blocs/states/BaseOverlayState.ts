import { BaseBloc, Bindable } from "bindable-bloc";

export default class BaseOverlayState extends BaseBloc {
    
    readonly isShowing = new Bindable<boolean>(false);
}