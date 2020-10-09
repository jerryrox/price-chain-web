import { Bindable } from "bindable-bloc";
import IItemPriceModel from "../../models/IItemPriceModel";
import BaseOverlayState from "./BaseOverlayState";

export default class ItemOverlayState extends BaseOverlayState {
    
    readonly source = new Bindable<IItemPriceModel | null>(null);
    readonly sku = new Bindable<string>("");
    readonly basePriceStr = new Bindable<string>("0");
    readonly discountRateStr = new Bindable<string>("0");

    get isEditing(): boolean {
        return this.source.value !== null;
    }

    get basePrice(): number {
        try {
            const value = parseFloat(this.basePriceStr.value);
            if (value === null || value === undefined || Number.isNaN(value)) {
                throw new Error(`Could not parse ${this.basePriceStr.value} to number.`);
            }
            return value;
        }
        catch (e) {
            console.log("Error while parsing base price input to number", e);
            return 0;
        }
    }

    get discountRate(): number {
        try {
            const value = parseFloat(this.discountRateStr.value);
            if (value === null || value === undefined || Number.isNaN(value)) {
                throw new Error(`Could not parse ${this.discountRateStr.value} to number.`);
            }
            return value;
        }
        catch (e) {
            console.log("Error while parsing discount rate input to number", e);
            return 0;
        }
    }

    get finalPrice(): number {
        return this.basePrice * (1 - this.discountRate);
    }
}