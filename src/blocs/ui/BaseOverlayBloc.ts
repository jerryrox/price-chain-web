import { BaseBloc } from "bindable-bloc";
import BaseOverlayState from "../states/BaseOverlayState";

export default class BaseOverlayBloc<T extends BaseOverlayState> extends BaseBloc {
    
    readonly overlayState: T;
    
    constructor(state: T) {
        super();
        this.overlayState = state;
    }
    
    show = () => this.overlayState.isShowing.value = true;

    hide = () => this.overlayState.isShowing.value = false;
}