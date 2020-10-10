import { Bindable } from "bindable-bloc";
import HistoryGraphField from "../../models/HistoryGraphField";
import IItemPriceModel from "../../models/IItemPriceModel";
import BaseOverlayState from "./BaseOverlayState";

export default class HistoryOverlayState extends BaseOverlayState {
    
    readonly item = new Bindable<IItemPriceModel | null>(null);
    readonly prices = new Bindable<IItemPriceModel[]>([]);

    readonly graphField = new Bindable<HistoryGraphField>(HistoryGraphField.FinalPrice);
}