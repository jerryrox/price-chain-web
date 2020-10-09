import { BaseBloc, Bindable } from "bindable-bloc";
import IItemPriceModel from "../../models/IItemPriceModel";

export default class SearchViewState extends BaseBloc {
    
    readonly searchValue = new Bindable<string>("");
    readonly results = new Bindable<IItemPriceModel[]>([]);
}