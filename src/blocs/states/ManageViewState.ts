import { BaseBloc, Bindable } from "bindable-bloc";
import IItemPriceModel from "../../models/IItemPriceModel";

export default class ManageViewState extends BaseBloc {
    
    readonly items = new Bindable<IItemPriceModel[]>([]);
}