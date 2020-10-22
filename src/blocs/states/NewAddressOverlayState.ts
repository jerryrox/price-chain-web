import { BaseBloc, Bindable } from "bindable-bloc";
import ICredential from "../../models/ICredential";
import BaseOverlayState from "./BaseOverlayState";

export default class NewAddressOverlayState extends BaseOverlayState {
    
    readonly credential = new Bindable<ICredential | null>(null);
}