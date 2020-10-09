import { BaseBloc, Bindable } from "bindable-bloc";
import BaseOverlayState from "./BaseOverlayState";

export default class BlockOverlayState extends BaseOverlayState {
    
    readonly blockIndex = new Bindable<string>("");
    readonly blockData = new Bindable<any>(null);

    get indexValue(): number {
        try {
            const value = parseInt(this.blockIndex.value, 10);
            if (value === null || value === undefined || Number.isNaN(value)) {
                throw new Error(`Failed to parse ${this.blockIndex.value} to int.`);
            }
            return value;
        }
        catch (e) {
            console.log("Error while parsing block index to int.", e);
            return -1;
        }
    }
}