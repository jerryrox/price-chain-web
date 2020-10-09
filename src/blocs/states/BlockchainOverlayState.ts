import { Bindable } from "bindable-bloc";
import BaseOverlayState from "./BaseOverlayState";

export default class BlockchainOverlayState extends BaseOverlayState {
    
    readonly chainData = new Bindable<any>({});
}